import { useInfiniteQuery } from '@tanstack/react-query';
import apiClient from '@App/lib/api';
import { SearchResponse } from '@App/types/movie';

const fetchMovies = async (query: string, page: number = 1): Promise<SearchResponse> => {
  const response = await apiClient.get<SearchResponse>('/movies', {
    params: { query, page },
  });
  return response.data;
};

export const useMoviesInfinite = (query: string) => {
  return useInfiniteQuery({
    queryKey: ['movies', query],
    queryFn: ({ pageParam = 1 }) => fetchMovies(query, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      // If results array is empty, no more pages
      if (!lastPage.results || lastPage.results.length === 0) {
        return undefined;
      }
      // If we have more results to fetch
      const currentPage = allPages.length;
      const totalPages = Math.ceil(lastPage.totalResults / 10);
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
    enabled: !!query && query.trim().length > 0,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
