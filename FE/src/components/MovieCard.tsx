'use client';

import { memo, useCallback, useMemo } from 'react';
import { Movie, MovieDetails as MovieDetailsType } from '@App/types/movie';
import { useFavorites } from '@App/hooks/useFavorites';
import MoviePoster from '@App/components/movie/MoviePoster';
import MovieTitle from '@App/components/movie/MovieTitle';
import MovieDetails from '@App/components/movie/MovieDetails';
import FavoriteButton from '@App/components/movie/FavoriteButton';

interface MovieCardProps {
  movie: Movie | MovieDetailsType;
  showDetails?: boolean;
}

const MovieCard = memo(function MovieCard({ movie, showDetails = false }: MovieCardProps) {
  const { favorites, addFavorite, removeFavorite, isAddingFavorite, isRemovingFavorite } = useFavorites();

  const isFavorite = useMemo(
    () => favorites.some((fav) => fav.imdbID === movie.imdbID),
    [favorites, movie.imdbID]
  );

  const handleToggleFavorite = useCallback(() => {
    if (isFavorite) {
      removeFavorite(movie.imdbID);
    } else {
      addFavorite(movie.imdbID);
    }
  }, [isFavorite, movie.imdbID, addFavorite, removeFavorite]);

  const movieDetails = showDetails ? (movie as MovieDetailsType) : null;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
      <MoviePoster src={movie.Poster} alt={movie.Title} />

      <div className="p-4">
        <MovieTitle title={movie.Title} year={movie.Year} />

        {showDetails && movieDetails && <MovieDetails movie={movieDetails} />}

        <FavoriteButton
          isFavorite={isFavorite}
          isLoading={isAddingFavorite || isRemovingFavorite}
          onToggle={handleToggleFavorite}
        />
      </div>
    </div>
  );
});

export default MovieCard;
