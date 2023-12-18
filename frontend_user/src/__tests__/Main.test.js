import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Main from '../Main';

test('renders main component correctly', async () => {
  render(
    <MemoryRouter>
      <Main />
    </MemoryRouter>
  );

  // Wait for the element to appear in the DOM
  await screen.findByText(/想要吃什麼？/i);

  // You can make assertions based on your component's actual content
  // For example, if your component renders a default restaurant name, you can check for that:
  expect(screen.getByText(/Default Restaurant Name/i)).toBeInTheDocument();

  // Similarly, you can check for other elements or behaviors as needed
});

// Add more tests as needed
