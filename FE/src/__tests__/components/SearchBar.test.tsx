import { render, screen, waitFor } from '@App/__tests__/test-utils';
import userEvent from '@testing-library/user-event';
import SearchBar from '@App/components/SearchBar';

describe('SearchBar', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('renders search input', () => {
    render(<SearchBar onSearch={jest.fn()} />);
    const input = screen.getByPlaceholderText('Search for movies...');
    expect(input).toBeInTheDocument();
  });

  it('renders search icon', () => {
    const { container } = render(<SearchBar onSearch={jest.fn()} />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('accepts initial value', () => {
    render(<SearchBar onSearch={jest.fn()} initialValue="batman" />);
    const input = screen.getByDisplayValue('batman');
    expect(input).toBeInTheDocument();
  });

  it('calls onSearch after debounce delay', async () => {
    const handleSearch = jest.fn();
    const user = userEvent.setup({ delay: null });

    render(<SearchBar onSearch={handleSearch} debounceMs={300} />);
    const input = screen.getByPlaceholderText('Search for movies...');

    await user.type(input, 'batman');

    expect(handleSearch).not.toHaveBeenCalled();

    jest.advanceTimersByTime(300);

    await waitFor(() => {
      expect(handleSearch).toHaveBeenCalledWith('batman');
    });
  });

  it('does not call onSearch for empty query', async () => {
    const handleSearch = jest.fn();
    render(<SearchBar onSearch={handleSearch} />);

    jest.advanceTimersByTime(300);

    await waitFor(() => {
      expect(handleSearch).not.toHaveBeenCalled();
    });
  });

  it('debounces multiple inputs', async () => {
    const handleSearch = jest.fn();
    const user = userEvent.setup({ delay: null });

    render(<SearchBar onSearch={handleSearch} debounceMs={300} />);
    const input = screen.getByPlaceholderText('Search for movies...');

    await user.type(input, 'bat');
    jest.advanceTimersByTime(100);
    await user.type(input, 'man');

    jest.advanceTimersByTime(300);

    await waitFor(() => {
      expect(handleSearch).toHaveBeenCalledTimes(1);
      expect(handleSearch).toHaveBeenCalledWith('batman');
    });
  });
});
