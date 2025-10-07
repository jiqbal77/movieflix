'use client';

import Header from '@App/components/Header';
import MovieCard from '@App/components/MovieCard';
import LoadingSpinner from '@App/components/LoadingSpinner';
import EmptyState from '@App/components/ui/EmptyState';
import ErrorState from '@App/components/ui/ErrorState';
import { useFavorites } from '@App/hooks/useFavorites';
import { useMemo } from 'react';

const FavoritesEmptyState = () => (
  <EmptyState
    icon={
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    }
    iconColor="text-purple-500"
    title="No Favorites Yet"
    description="Start building your collection of favorite movies"
    actionLabel="Explore Movies"
    actionHref="/search"
  />
);

export default function FavoritesPage() {
  const { favorites, isLoading, error } = useFavorites();

  const favoritesCount = useMemo(() => favorites.length, [favorites.length]);
  const countText = useMemo(
    () =>
      favoritesCount > 0
        ? `${favoritesCount} ${favoritesCount === 1 ? 'movie' : 'movies'} saved`
        : 'No favorites yet',
    [favoritesCount]
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-gray-800 mb-2">My Favorites</h2>
          <p className="text-gray-600">{countText}</p>
        </div>

        {error && (
          <ErrorState title="Error loading favorites" message="Please try again later" />
        )}

        {isLoading && <LoadingSpinner size="lg" message="Loading your favorites..." />}

        {!isLoading && !error && favoritesCount === 0 && <FavoritesEmptyState />}

        {!isLoading && !error && favoritesCount > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {favorites.map((movie) => (
              <MovieCard key={movie.imdbID} movie={movie} showDetails={true} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
