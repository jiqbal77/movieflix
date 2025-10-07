import { memo } from 'react';
import { MovieDetails as MovieDetailsType } from '@App/types/movie';

interface MovieDetailsProps {
  movie: MovieDetailsType;
}

const MovieDetails = memo(function MovieDetails({ movie }: MovieDetailsProps) {
  return (
    <div className="text-sm space-y-1 mb-3">
      {movie.Genre && (
        <p className="text-gray-700">
          <span className="font-semibold">Genre:</span> {movie.Genre}
        </p>
      )}
      {movie.Director && (
        <p className="text-gray-700">
          <span className="font-semibold">Director:</span> {movie.Director}
        </p>
      )}
      {movie.Runtime && (
        <p className="text-gray-700">
          <span className="font-semibold">Runtime:</span> {movie.Runtime}
        </p>
      )}
      {movie.imdbRating && (
        <p className="text-gray-700">
          <span className="font-semibold">Rating:</span> {movie.imdbRating}/10
        </p>
      )}
      {movie.Plot && (
        <p className="text-gray-700 mt-2">
          <span className="font-semibold">Plot:</span> {movie.Plot}
        </p>
      )}
    </div>
  );
});

export default MovieDetails;
