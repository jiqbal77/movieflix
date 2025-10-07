import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback, useMemo } from 'react';
import apiClient from '@App/lib/api';
import { MovieDetails, FavoriteResponse } from '@App/types/movie';

const fetchFavorites = async (): Promise<MovieDetails[]> => {
  const response = await apiClient.get<MovieDetails[]>('/favorites');
  return response.data;
};

const addFavorite = async (imdbID: string): Promise<MovieDetails> => {
  const response = await apiClient.post<MovieDetails>('/favorites', { imdbID });
  return response.data;
};

const removeFavorite = async (imdbID: string): Promise<FavoriteResponse> => {
  const response = await apiClient.delete<FavoriteResponse>(`/favorites/${imdbID}`);
  return response.data;
};

export const useFavorites = () => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['favorites'],
    queryFn: fetchFavorites,
    staleTime: 1000 * 60 * 2, // 2 minutes
  });

  const addMutation = useMutation({
    mutationFn: (imdbID: string) => addFavorite(imdbID),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
    },
  });

  const removeMutation = useMutation({
    mutationFn: (imdbID: string) => removeFavorite(imdbID),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
    },
  });

  const favorites = useMemo(() => query.data || [], [query.data]);

  const handleAddFavorite = useCallback(
    (imdbID: string) => {
      addMutation.mutate(imdbID);
    },
    [addMutation]
  );

  const handleRemoveFavorite = useCallback(
    (imdbID: string) => {
      removeMutation.mutate(imdbID);
    },
    [removeMutation]
  );

  return {
    favorites,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error,
    refetch: query.refetch,
    addFavorite: handleAddFavorite,
    removeFavorite: handleRemoveFavorite,
    isAddingFavorite: addMutation.isPending,
    isRemovingFavorite: removeMutation.isPending,
  };
};
