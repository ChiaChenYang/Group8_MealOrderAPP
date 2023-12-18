import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import Home from '../Home';

// Mock the API call
beforeAll(() => {
  jest.spyOn(global, 'fetch').mockResolvedValue({
    ok: true,
    json: () => Promise.resolve({
      id: 1,
      name: 'John Doe',
      division: 'Mock Division',
      position: 'Mock Position',
    }),
  });
});

afterAll(() => {
  global.fetch.mockRestore();
});

test('renders user information correctly', async () => {
  render(
    <MemoryRouter initialEntries={['/1']}>
      <Route path="/:userId">
        <Home />
      </Route>
    </MemoryRouter>
  );

  // Wait for the element to appear in the DOM
  await screen.findByText(/姓名: John Doe/i);

  // Make assertions based on the mocked data
  expect(screen.getByText(/單位: Mock Division/i)).toBeInTheDocument();
  expect(screen.getByText(/職稱: Mock Position/i)).toBeInTheDocument();
});