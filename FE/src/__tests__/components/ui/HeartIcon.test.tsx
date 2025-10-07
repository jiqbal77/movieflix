import { render } from '@App/__tests__/test-utils';
import HeartIcon from '@App/components/ui/HeartIcon';

describe('HeartIcon', () => {
  it('renders outlined heart by default', () => {
    const { container } = render(<HeartIcon />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('fill', 'none');
  });

  it('renders filled heart when filled prop is true', () => {
    const { container } = render(<HeartIcon filled />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('fill', 'currentColor');
  });

  it('applies custom className', () => {
    const { container } = render(<HeartIcon className="w-10 h-10" />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveClass('w-10', 'h-10');
  });

  it('has default className when not provided', () => {
    const { container } = render(<HeartIcon />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveClass('w-5', 'h-5');
  });
});
