import {
  Injectable,
  Logger,
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { Movie, SearchResponse } from './movie.interface';

@Injectable()
export class MoviesService {
  private readonly logger = new Logger(MoviesService.name);
  private readonly omdbApiKey: string | undefined;
  private readonly omdbBaseUrl = 'http://www.omdbapi.com/';

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.omdbApiKey = this.configService.get<string>('OMDB_API_KEY');
    if (!this.omdbApiKey) {
      this.logger.warn('OMDB_API_KEY not configured');
    }
  }

  async search(query: string, page: number = 1): Promise<SearchResponse> {
    if (!query || query.trim() === '') {
      throw new BadRequestException('Query parameter is required');
    }

    if (!this.omdbApiKey) {
      throw new InternalServerErrorException('OMDb API key is not configured');
    }

    try {
      const url = `${this.omdbBaseUrl}?apikey=${this.omdbApiKey}&s=${encodeURIComponent(query)}&page=${page}`;
      this.logger.debug(`Searching OMDb: ${query}, page: ${page}`);

      const response = await firstValueFrom(this.httpService.get(url));

      if (!response.data || response.data.Response === 'False') {
        this.logger.debug(
          `No results found: ${response.data?.Error || 'Unknown error'}`,
        );
        return {
          results: [],
          totalResults: 0,
        };
      }

      const results = response.data.Search?.filter(
        (movie: any, index: number, self: any[]) =>
          index === self.findIndex((m) => m.imdbID === movie.imdbID),
      ).map((movie: any) => ({
        imdbID: movie.imdbID,
        Title: movie.Title,
        Year: movie.Year,
        Poster: movie.Poster,
      }));

      return {
        results,
        totalResults: Number(response.data.totalResults || 0),
      };
    } catch (error) {
      this.logger.error(`Error searching OMDb: ${error.message}`, error.stack);
      throw new InternalServerErrorException('Failed to search movies');
    }
  }

  async getById(imdbID: string): Promise<Movie | null> {
    if (!imdbID || imdbID.trim() === '') {
      throw new BadRequestException('imdbID parameter is required');
    }

    if (!this.omdbApiKey) {
      throw new InternalServerErrorException('OMDb API key is not configured');
    }

    try {
      const url = `${this.omdbBaseUrl}?apikey=${this.omdbApiKey}&i=${encodeURIComponent(imdbID)}`;
      this.logger.debug(`Fetching movie details: ${imdbID}`);

      const response = await firstValueFrom(this.httpService.get(url));

      if (!response.data || response.data.Response === 'False') {
        this.logger.warn(`OMDb returned no movie for ID: ${imdbID}`);
        return null;
      }

      return {
        imdbID: response.data.imdbID,
        Title: response.data.Title,
        Year: response.data.Year,
        Poster: response.data.Poster,
        Plot: response.data.Plot,
        Director: response.data.Director,
        Genre: response.data.Genre,
        Runtime: response.data.Runtime,
        imdbRating: response.data.imdbRating,
      };
    } catch (error) {
      this.logger.error(
        `Error fetching movie by ID: ${error.message}`,
        error.stack,
      );
      throw new InternalServerErrorException('Failed to fetch movie details');
    }
  }
}
