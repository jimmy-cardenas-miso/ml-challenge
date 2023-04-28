import { fireEvent, render } from '@testing-library/react';
import { Header } from './Header';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Header component', () => {
  it('renders correctly with proper elements and attributes', () => {
    const { getByRole, getByLabelText } = render(<Header />);
    const header = getByRole('banner');
    expect(header).toBeDefined();
    const logo = getByRole('button', { name: 'Logo' });
    expect(logo).toBeDefined();
    const searchInput = getByLabelText('Search');
    expect(searchInput).toBeDefined();
    const searchButton = getByRole('button', { name: 'buscar' });
    expect(searchButton).toBeDefined();
  });

  it('handles search input state correctly', () => {
    const { getByLabelText } = render(<Header />);
    const searchInput = getByLabelText('Search') as HTMLInputElement;
    fireEvent.change(searchInput, { target: { value: 'example' } });
    expect(searchInput.value).toBe('example');
  });

  it('redirects to home page when clicking logo button', () => {
    const { getByRole } = render(<Header />);
    const logoButton = getByRole('button', { name: 'Logo' });
    fireEvent.click(logoButton);
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('redirects to search page with proper query string when submitting search form', () => {
    const { getByRole, getByLabelText } = render(<Header />);
    const searchInput = getByLabelText('Search') as HTMLInputElement;
    const searchButton = getByRole('button', { name: 'buscar' });
    fireEvent.change(searchInput, { target: { value: 'example' } });
    fireEvent.click(searchButton);
    expect(mockNavigate).toHaveBeenCalledWith('/items?search=example');
  });
});
