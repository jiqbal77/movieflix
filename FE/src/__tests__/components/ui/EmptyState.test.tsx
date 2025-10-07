import { render, screen } from '@App/__tests__/test-utils';
import EmptyState from '@App/components/ui/EmptyState';

describe('EmptyState', () => {
  const mockIcon = <svg data-testid="mock-icon">Icon</svg>;

  it('renders title and description', () => {
    render(
      <EmptyState
        icon={mockIcon}
        title="No Items"
        description="Add some items to get started"
      />
    );

    expect(screen.getByText('No Items')).toBeInTheDocument();
    expect(screen.getByText('Add some items to get started')).toBeInTheDocument();
  });

  it('renders icon', () => {
    render(
      <EmptyState
        icon={mockIcon}
        title="No Items"
        description="Description"
      />
    );

    expect(screen.getByTestId('mock-icon')).toBeInTheDocument();
  });

  it('renders action button when provided', () => {
    render(
      <EmptyState
        icon={mockIcon}
        title="No Items"
        description="Description"
        actionLabel="Add Item"
        actionHref="/add"
      />
    );

    const link = screen.getByRole('link', { name: 'Add Item' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/add');
  });

  it('does not render action button when not provided', () => {
    render(
      <EmptyState
        icon={mockIcon}
        title="No Items"
        description="Description"
      />
    );

    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  it('applies custom icon color', () => {
    const { container } = render(
      <EmptyState
        icon={mockIcon}
        title="No Items"
        description="Description"
        iconColor="text-red-500"
      />
    );

    const iconContainer = container.querySelector('.text-red-500');
    expect(iconContainer).toBeInTheDocument();
  });
});
