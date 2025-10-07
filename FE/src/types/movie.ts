// Movie object from search results
export interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
}

// Movie object with full details (from favorites)
export interface MovieDetails extends Movie {
  Plot?: string;
  Director?: string;
  Genre?: string;
  Runtime?: string;
  imdbRating?: string;
}

// Search response
export interface SearchResponse {
  results: Movie[];
  totalResults: number;
}

// Add/Remove favorite response
export interface FavoriteResponse {
  success: true;
  message?: string;
}
