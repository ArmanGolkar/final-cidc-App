import { render, screen } from '@testing-library/react';
import App from './App';

test('renders group number and team members', () => {
  render(<App />);
  expect(screen.getByText(/Group 7/i)).toBeInTheDocument();
  expect(screen.getByText(/Arman/i)).toBeInTheDocument();
});