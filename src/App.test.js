import { render, screen } from '@testing-library/react';
import App from './App';

test('renders progress school heading', () => {
  render(<App />);
  const headingElement = screen.getByRole('heading', {
    name: /ingliz tilini tizimli o‘rganing, real natijaga chiqing/i,
  });
  expect(headingElement).toBeInTheDocument();
});
