import { render, screen } from '@App/__tests__/test-utils';
import userEvent from '@testing-library/user-event';
import MovieCard from '@App/components/MovieCard';
import { Movie } from '@App/types/movie';
import * as useFavoritesHook from '@App/hooks/useFavorites';

// Mock the useFavorites hook
jest.mock('@App/hooks/useFavorites');

describe('MovieCard', () => {
  const mockMovie: Movie = {
    imdbID: 'tt0372784',
    Title: 'Batman Begins',
    Year: '2005',
    Poster: 'https://example.com/poster.jpg',
  };

  const mockUseFavorites = {
    favorites: [],
    isLoading: false,
    isFetching: false,
    error: null,
    refetch: jest.fn(),
    addFavorite: jest.fn(),
    removeFavorite: jest.fn(),
    isAddingFavorite: false,
    isRemovingFavorite: false,
  };

  beforeEach(() => {
    (useFavoritesHook.useFavorites as jest.Mock).mockReturnValue(mockUseFavorites);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders movie title and year', () => {
    render(<MovieCard movie={mockMovie} />);
    expect(screen.getByText('Batman Begins')).toBeInTheDocument();
    expect(screen.getByText('2005')).toBeInTheDocument();
  });

  it('renders movie poster', () => {
    render(<MovieCard movie={mockMovie} />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('alt', 'Batman Begins');
  });

  it('renders Add to Favorites button when not favorited', () => {
    render(<MovieCard movie={mockMovie} />);
    expect(screen.getByText('Add to Favorites')).toBeInTheDocument();
  });

  it('renders Remove button when favorited', () => {
    (useFavoritesHook.useFavorites as jest.Mock).mockReturnValue({
      ...mockUseFavorites,
      favorites: [mockMovie],
    });

    render(<MovieCard movie={mockMovie} />);
    expect(screen.getByText('Remove')).toBeInTheDocument();
  });

  it('calls addFavorite when Add button is clicked', async () => {
    const user = userEvent.setup();
    render(<MovieCard movie={mockMovie} />);

    await user.click(screen.getByText('Add to Favorites'));

    expect(mockUseFavorites.addFavorite).toHaveBeenCalledWith('tt0372784');
  });

  it('calls removeFavorite when Remove button is clicked', async () => {
    const user = userEvent.setup();
    (useFavoritesHook.useFavorites as jest.Mock).mockReturnValue({
      ...mockUseFavorites,
      favorites: [mockMovie],
    });

    render(<MovieCard movie={mockMovie} />);

    await user.click(screen.getByText('Remove'));

    expect(mockUseFavorites.removeFavorite).toHaveBeenCalledWith('tt0372784');
  });

  it('does not render details by default', () => {
    const movieWithDetails = {
      ...mockMovie,
      Genre: 'Action',
      Director: 'Christopher Nolan',
    };

    render(<MovieCard movie={movieWithDetails} />);

    expect(screen.queryByText('Genre:')).not.toBeInTheDocument();
    expect(screen.queryByText('Director:')).not.toBeInTheDocument();
  });

  it('renders details when showDetails is true', () => {
    const movieWithDetails = {
      ...mockMovie,
      Genre: 'Action',
      Director: 'Christopher Nolan',
    };

    render(<MovieCard movie={movieWithDetails} showDetails={true} />);

    expect(screen.getByText(/Action/)).toBeInTheDocument();
    expect(screen.getByText(/Christopher Nolan/)).toBeInTheDocument();
  });
});
