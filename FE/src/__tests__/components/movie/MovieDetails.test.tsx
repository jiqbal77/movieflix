import { render, screen } from '@App/__tests__/test-utils';
import MovieDetails from '@App/components/movie/MovieDetails';
import { MovieDetails as MovieDetailsType } from '@App/types/movie';

describe('MovieDetails', () => {
  const mockMovie: MovieDetailsType = {
    imdbID: 'tt0372784',
    Title: 'Batman Begins',
    Year: '2005',
    Poster: 'https://example.com/poster.jpg',
    Genre: 'Action, Crime, Drama',
    Director: 'Christopher Nolan',
    Runtime: '140 min',
    imdbRating: '8.2',
    Plot: 'After training with his mentor, Batman begins...',
  };

  it('renders genre when provided', () => {
    render(<MovieDetails movie={mockMovie} />);
    expect(screen.getByText(/Action, Crime, Drama/)).toBeInTheDocument();
  });

  it('renders director when provided', () => {
    render(<MovieDetails movie={mockMovie} />);
    expect(screen.getByText(/Christopher Nolan/)).toBeInTheDocument();
  });

  it('renders runtime when provided', () => {
    render(<MovieDetails movie={mockMovie} />);
    expect(screen.getByText(/140 min/)).toBeInTheDocument();
  });

  it('renders rating when provided', () => {
    render(<MovieDetails movie={mockMovie} />);
    expect(screen.getByText(/8.2\/10/)).toBeInTheDocument();
  });

  it('renders plot when provided', () => {
    render(<MovieDetails movie={mockMovie} />);
    expect(screen.getByText(/After training with his mentor/)).toBeInTheDocument();
  });

  it('does not render fields when not provided', () => {
    const minimalMovie: MovieDetailsType = {
      imdbID: 'tt0372784',
      Title: 'Batman Begins',
      Year: '2005',
      Poster: 'https://example.com/poster.jpg',
    };

    render(<MovieDetails movie={minimalMovie} />);
    expect(screen.queryByText(/Genre:/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Director:/)).not.toBeInTheDocument();
  });
});
