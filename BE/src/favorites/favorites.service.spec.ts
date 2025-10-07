import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { MoviesService } from '../movies/movies.service';
import { Movie } from '../movies/movie.interface';

describe('FavoritesService', () => {
  let service: FavoritesService;
  let moviesService: MoviesService;

  const mockMovie: Movie = {
    imdbID: 'tt0372784',
    Title: 'Batman Begins',
    Year: '2005',
    Poster: 'https://example.com/poster.jpg',
    Plot: 'After training with his mentor...',
    Director: 'Christopher Nolan',
    Genre: 'Action, Crime',
    Runtime: '140 min',
    imdbRating: '8.2',
  };

  const mockMoviesService = {
    getById: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FavoritesService,
        {
          provide: MoviesService,
          useValue: mockMoviesService,
        },
      ],
    }).compile();

    service = module.get<FavoritesService>(FavoritesService);
    moviesService = module.get<MoviesService>(MoviesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('addFavorite', () => {
    it('should add a movie to favorites when valid imdbID is provided', async () => {
      mockMoviesService.getById.mockResolvedValue(mockMovie);

      const result = await service.addFavorite('tt0372784');

      expect(result).toEqual(mockMovie);
      expect(moviesService.getById).toHaveBeenCalledWith('tt0372784');
    });

    it('should return existing movie if already in favorites', async () => {
      mockMoviesService.getById.mockResolvedValue(mockMovie);

      // Add the movie first
      await service.addFavorite('tt0372784');

      // Try adding it again
      const result = await service.addFavorite('tt0372784');

      expect(result).toEqual(mockMovie);
      expect(moviesService.getById).toHaveBeenCalledTimes(1); // Only called once
    });

    it('should throw NotFoundException when movie is not found', async () => {
      mockMoviesService.getById.mockResolvedValue(null);

      await expect(service.addFavorite('invalid-id')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('getAllFavorites', () => {
    it('should return an empty array when no favorites exist', async () => {
      const result = await service.getAllFavorites();

      expect(result).toEqual([]);
      expect(result).toHaveLength(0);
    });

    it('should return all favorite movies', async () => {
      const mockMovie2: Movie = {
        imdbID: 'tt0468569',
        Title: 'The Dark Knight',
        Year: '2008',
        Poster: 'https://example.com/poster2.jpg',
      };

      mockMoviesService.getById.mockResolvedValueOnce(mockMovie);
      mockMoviesService.getById.mockResolvedValueOnce(mockMovie2);

      await service.addFavorite('tt0372784');
      await service.addFavorite('tt0468569');

      const result = await service.getAllFavorites();

      expect(result).toHaveLength(2);
      expect(result[0].imdbID).toBe('tt0372784');
      expect(result[1].imdbID).toBe('tt0468569');
    });
  });

  describe('removeFavorite', () => {
    it('should remove a favorite movie', async () => {
      mockMoviesService.getById.mockResolvedValue(mockMovie);

      await service.addFavorite('tt0372784');
      const result = await service.removeFavorite('tt0372784');

      expect(result).toEqual({
        success: true,
        message: 'Favorite removed successfully',
      });

      const favorites = await service.getAllFavorites();
      expect(favorites).toHaveLength(0);
    });

    it('should return success message even when movie was not in favorites', async () => {
      const result = await service.removeFavorite('nonexistent-id');

      expect(result).toEqual({
        success: true,
        message: 'Movie was not in favorites',
      });
    });
  });
});
