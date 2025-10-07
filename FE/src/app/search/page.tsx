"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Header from "@App/components/Header";
import SearchBar from "@App/components/SearchBar";
import MovieCard from "@App/components/MovieCard";
import LoadingSpinner from "@App/components/LoadingSpinner";
import EmptyState from "@App/components/ui/EmptyState";
import ErrorState from "@App/components/ui/ErrorState";
import { useMoviesInfinite } from "@App/hooks/useMovies";

const SearchEmptyState = () => (
  <EmptyState
    icon={
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    }
    iconColor="text-blue-500"
    title="Discover Amazing Movies"
    description="Start searching for your favorite movies above"
  />
);

const NoResultsState = ({ query }: { query: string }) => (
  <EmptyState
    icon={
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
      </svg>
    }
    title={`No movies found for "${query}"`}
    description="Try searching with different keywords"
  />
);

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("movieSearchQuery") || "";
    }
    return "";
  });

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage, error } = useMoviesInfinite(searchQuery);

  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    sessionStorage.setItem("movieSearchQuery", searchQuery);
  }, [searchQuery]);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const allMovies = data?.pages.flatMap((page) => page.results) || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <SearchBar onSearch={handleSearch} initialValue={searchQuery} />

        {error && <ErrorState title="Error loading movies" message="Please try again later" />}

        {isLoading && <LoadingSpinner size="lg" message="Searching for movies..." />}

        {!isLoading && !error && searchQuery && allMovies.length === 0 && <NoResultsState query={searchQuery} />}

        {!isLoading && !error && !searchQuery && <SearchEmptyState />}

        {allMovies.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {allMovies.map((movie) => (
                <MovieCard key={movie.imdbID} movie={movie} />
              ))}
            </div>

            <div ref={observerTarget} className="py-8">
              {isFetchingNextPage && <LoadingSpinner size="md" message="Loading more movies..." />}
              {!hasNextPage && allMovies.length > 0 && <p className="text-center text-gray-500 text-sm">You&apos;ve reached the end of the results</p>}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
