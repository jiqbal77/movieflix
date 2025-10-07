export interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  Plot?: string;
  Director?: string;
  Genre?: string;
  Runtime?: string;
  imdbRating?: string;
}

export interface SearchResponse {
  results: Movie[];
  totalResults: number;
}
