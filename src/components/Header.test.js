import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Header from './Header';

describe('Header component', () => {
    test('renders Header component with correct text', () => {
      render(<Header />);
      const headerElement = screen.getByText(/NYC Reach Provider Directory/i);
      expect(headerElement).toBeInTheDocument();
    });
  });