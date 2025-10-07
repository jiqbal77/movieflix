import { Test, TestingModule } from '@nestjs/testing';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { of, throwError } from 'rxjs';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;
  let httpService: HttpService;
  let configService: ConfigService;

  const mockHttpService = {
    get: jest.fn(),
  };

  const mockConfigService = {
    get: jest.fn().mockReturnValue('test-api-key'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MoviesService,
        {
          provide: HttpService,
          useValue: mockHttpService,
        },
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
      ],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
    httpService = module.get<HttpService>(HttpService);
    configService = module.get<ConfigService>(ConfigService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('search', () => {
    it('should return search results when OMDb API returns data', async () => {
      const mockResponse = {
        data: {
          Search: [
            {
              imdbID: 'tt0372784',
              Title: 'Batman Begins',
              Year: '2005',
              Poster: 'https://example.com/poster.jpg',
            },
          ],
          totalResults: '1',
          Response: 'True',
        },
      };

      mockHttpService.get.mockReturnValue(of(mockResponse));

      const result = await service.search('batman', 1);

      expect(result).toEqual({
        results: [
          {
            imdbID: 'tt0372784',
            Title: 'Batman Begins',
            Year: '2005',
            Poster: 'https://example.com/poster.jpg',
          },
        ],
        totalResults: 1,
      });
      expect(httpService.get).toHaveBeenCalledWith(
        expect.stringContaining('s=batman&page=1'),
      );
    });

    it('should return empty results when OMDb API returns no results', async () => {
      const mockResponse = {
        data: {
          Response: 'False',
          Error: 'Movie not found!',
        },
      };

      mockHttpService.get.mockReturnValue(of(mockResponse));

      const result = await service.search('nonexistentmovie', 1);

      expect(result).toEqual({
        results: [],
        totalResults: 0,
      });
    });

    it('should throw BadRequestException when query is empty', async () => {
      await expect(service.search('', 1)).rejects.toThrow(BadRequestException);
      await expect(service.search('   ', 1)).rejects.toThrow(BadRequestException);
    });

    it('should throw InternalServerErrorException when HTTP request fails', async () => {
      mockHttpService.get.mockReturnValue(
        throwError(() => new Error('Network error')),
      );

      await expect(service.search('batman', 1)).rejects.toThrow(
        InternalServerErrorException,
      );
    });

    it('should throw InternalServerErrorException when API key is not configured', async () => {
      mockConfigService.get.mockReturnValueOnce(undefined);

      const moduleWithoutApiKey: TestingModule = await Test.createTestingModule({
        providers: [
          MoviesService,
          {
            provide: HttpService,
            useValue: mockHttpService,
          },
          {
            provide: ConfigService,
            useValue: mockConfigService,
          },
        ],
      }).compile();

      const serviceWithoutKey = moduleWithoutApiKey.get<MoviesService>(MoviesService);

      await expect(serviceWithoutKey.search('batman', 1)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('getById', () => {
    it('should return movie details when OMDb API returns data', async () => {
      const mockResponse = {
        data: {
          imdbID: 'tt0372784',
          Title: 'Batman Begins',
          Year: '2005',
          Poster: 'https://example.com/poster.jpg',
          Plot: 'After training with his mentor...',
          Director: 'Christopher Nolan',
          Genre: 'Action, Crime',
          Runtime: '140 min',
          imdbRating: '8.2',
          Response: 'True',
        },
      };

      mockHttpService.get.mockReturnValue(of(mockResponse));

      const result = await service.getById('tt0372784');

      expect(result).toEqual({
        imdbID: 'tt0372784',
        Title: 'Batman Begins',
        Year: '2005',
        Poster: 'https://example.com/poster.jpg',
        Plot: 'After training with his mentor...',
        Director: 'Christopher Nolan',
        Genre: 'Action, Crime',
        Runtime: '140 min',
        imdbRating: '8.2',
      });
      expect(httpService.get).toHaveBeenCalledWith(
        expect.stringContaining('i=tt0372784'),
      );
    });

    it('should return null when OMDb API returns no data', async () => {
      const mockResponse = {
        data: {
          Response: 'False',
          Error: 'Incorrect IMDb ID.',
        },
      };

      mockHttpService.get.mockReturnValue(of(mockResponse));

      const result = await service.getById('invalid-id');

      expect(result).toBeNull();
    });

    it('should throw BadRequestException when imdbID is empty', async () => {
      await expect(service.getById('')).rejects.toThrow(BadRequestException);
      await expect(service.getById('   ')).rejects.toThrow(BadRequestException);
    });

    it('should throw InternalServerErrorException when HTTP request fails', async () => {
      mockHttpService.get.mockReturnValue(
        throwError(() => new Error('Network error')),
      );

      await expect(service.getById('tt0372784')).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });
});
