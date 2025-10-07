import { render, screen, waitFor } from '@App/__tests__/test-utils';
import MoviePoster from '@App/components/movie/MoviePoster';

describe('MoviePoster', () => {
  it('renders image with correct src and alt', () => {
    render(
      <MoviePoster
        src="https://example.com/poster.jpg"
        alt="Test Movie"
      />
    );

    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', 'https://example.com/poster.jpg');
    expect(img).toHaveAttribute('alt', 'Test Movie');
  });

  it('uses fallback when src is N/A', () => {
    render(
      <MoviePoster
        src="N/A"
        alt="Test Movie"
      />
    );

    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', '/placeholder-poster.svg');
  });

  it('handles image load error', async () => {
    render(
      <MoviePoster
        src="https://example.com/broken.jpg"
        alt="Test Movie"
      />
    );

    const img = screen.getByRole('img') as HTMLImageElement;

    // Simulate image error
    await waitFor(() => {
      img.dispatchEvent(new Event('error'));
    });

    await waitFor(() => {
      expect(img).toHaveAttribute('src', '/placeholder-poster.svg');
    });
  });

  it('has loading lazy attribute', () => {
    render(
      <MoviePoster
        src="https://example.com/poster.jpg"
        alt="Test Movie"
      />
    );

    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('loading', 'lazy');
  });

  it('uses custom fallback when provided', () => {
    render(
      <MoviePoster
        src="N/A"
        alt="Test Movie"
        fallbackSrc="/custom-fallback.png"
      />
    );

    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', '/custom-fallback.png');
  });
});
