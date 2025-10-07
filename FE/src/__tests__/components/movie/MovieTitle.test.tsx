import { render, screen } from '@App/__tests__/test-utils';
import MovieTitle from '@App/components/movie/MovieTitle';

describe('MovieTitle', () => {
  it('renders movie title', () => {
    render(<MovieTitle title="The Dark Knight" year="2008" />);
    expect(screen.getByText('The Dark Knight')).toBeInTheDocument();
  });

  it('renders movie year', () => {
    render(<MovieTitle title="The Dark Knight" year="2008" />);
    expect(screen.getByText('2008')).toBeInTheDocument();
  });

  it('renders calendar icon', () => {
    const { container } = render(
      <MovieTitle title="The Dark Knight" year="2008" />
    );
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('applies correct heading styles', () => {
    render(<MovieTitle title="The Dark Knight" year="2008" />);
    const title = screen.getByText('The Dark Knight');
    expect(title.tagName).toBe('H3');
    expect(title).toHaveClass('font-bold');
  });
});
