import { render, screen } from '@App/__tests__/test-utils';
import userEvent from '@testing-library/user-event';
import FavoriteButton from '@App/components/movie/FavoriteButton';

describe('FavoriteButton', () => {
  it('shows "Add to Favorites" when not favorite', () => {
    render(
      <FavoriteButton
        isFavorite={false}
        isLoading={false}
        onToggle={jest.fn()}
      />
    );
    expect(screen.getByText('Add to Favorites')).toBeInTheDocument();
  });

  it('shows "Remove" when is favorite', () => {
    render(
      <FavoriteButton
        isFavorite={true}
        isLoading={false}
        onToggle={jest.fn()}
      />
    );
    expect(screen.getByText('Remove')).toBeInTheDocument();
  });

  it('calls onToggle when clicked', async () => {
    const handleToggle = jest.fn();
    const user = userEvent.setup();

    render(
      <FavoriteButton
        isFavorite={false}
        isLoading={false}
        onToggle={handleToggle}
      />
    );

    await user.click(screen.getByRole('button'));
    expect(handleToggle).toHaveBeenCalledTimes(1);
  });

  it('is disabled when loading', () => {
    render(
      <FavoriteButton
        isFavorite={false}
        isLoading={true}
        onToggle={jest.fn()}
      />
    );

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('shows loading text when loading', () => {
    render(
      <FavoriteButton
        isFavorite={false}
        isLoading={true}
        onToggle={jest.fn()}
      />
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders with primary variant when not favorite', () => {
    render(
      <FavoriteButton
        isFavorite={false}
        isLoading={false}
        onToggle={jest.fn()}
      />
    );

    const button = screen.getByRole('button');
    expect(button).toHaveClass('from-blue-500');
  });

  it('renders with danger variant when favorite', () => {
    render(
      <FavoriteButton
        isFavorite={true}
        isLoading={false}
        onToggle={jest.fn()}
      />
    );

    const button = screen.getByRole('button');
    expect(button).toHaveClass('from-red-500');
  });
});
