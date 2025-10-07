import { render, screen } from '@App/__tests__/test-utils';
import ErrorState from '@App/components/ui/ErrorState';

describe('ErrorState', () => {
  it('renders with default title and message', () => {
    render(<ErrorState />);

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(screen.getByText('Please try again later')).toBeInTheDocument();
  });

  it('renders with custom title and message', () => {
    render(
      <ErrorState
        title="Custom Error"
        message="Custom error message"
      />
    );

    expect(screen.getByText('Custom Error')).toBeInTheDocument();
    expect(screen.getByText('Custom error message')).toBeInTheDocument();
  });

  it('renders error icon', () => {
    const { container } = render(<ErrorState />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });
});
