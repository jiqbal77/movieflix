import { render, screen } from '@App/__tests__/test-utils';
import LoadingSpinner from '@App/components/LoadingSpinner';
import '@testing-library/jest-dom';

describe('LoadingSpinner', () => {
  it('renders spinner', () => {
    const { container } = render(<LoadingSpinner />);
    const spinner = container.querySelector('.animate-spin');
    expect(spinner).toBeInTheDocument();
  });

  it('renders with message when provided', () => {
    render(<LoadingSpinner message="Loading data..." />);
    expect(screen.getByText('Loading data...')).toBeInTheDocument();
  });

  it('does not render message when not provided', () => {
    const { container } = render(<LoadingSpinner />);
    const text = container.querySelector('p');
    expect(text).not.toBeInTheDocument();
  });

  it('renders with small size', () => {
    const { container } = render(<LoadingSpinner size="sm" />);
    const spinner = container.querySelector('.w-8');
    expect(spinner).toBeInTheDocument();
  });

  it('renders with medium size by default', () => {
    const { container } = render(<LoadingSpinner />);
    const spinner = container.querySelector('.w-12');
    expect(spinner).toBeInTheDocument();
  });

  it('renders with large size', () => {
    const { container } = render(<LoadingSpinner size="lg" />);
    const spinner = container.querySelector('.w-16');
    expect(spinner).toBeInTheDocument();
  });
});
