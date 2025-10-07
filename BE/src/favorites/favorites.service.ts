import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Movie } from '../movies/movie.interface';
import { MoviesService } from '../movies/movies.service';

/**
 * Favorites Service
 *
 * Manages favorite movies using in-memory storage.
 * Data persists only until server restart.
 */
@Injectable()
export class FavoritesService {
  private readonly logger = new Logger(FavoritesService.name);
  private readonly favorites = new Map<string, Movie>();

  constructor(private readonly moviesService: MoviesService) {}

  async addFavorite(imdbID: string): Promise<Movie> {
    // Check if already in favorites
    const existingMovie = this.favorites.get(imdbID);
    if (existingMovie) {
      this.logger.debug(`Movie ${imdbID} already in favorites`);
      return existingMovie;
    }

    // Fetch movie details from OMDb API
    const movie = await this.moviesService.getById(imdbID);

    if (!movie) {
      throw new NotFoundException(`Movie with imdbID ${imdbID} not found`);
    }

    // Add to favorites map
    this.favorites.set(imdbID, movie);
    this.logger.debug(`Added movie ${imdbID} to favorites`);

    return movie;
  }

  async getAllFavorites(): Promise<Movie[]> {
    const favorites = Array.from(this.favorites.values());
    this.logger.debug(`Retrieved ${favorites.length} favorites`);
    return favorites;
  }

  async removeFavorite(imdbID: string): Promise<{ success: boolean; message: string }> {
    if (this.favorites.has(imdbID)) {
      this.favorites.delete(imdbID);
      this.logger.debug(`Removed movie ${imdbID} from favorites`);
      return { success: true, message: 'Favorite removed successfully' };
    }

    this.logger.debug(`Movie ${imdbID} was not in favorites`);
    return { success: true, message: 'Movie was not in favorites' };
  }
}
