import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Home from '../Home.js';
import { BrowserRouter as Router } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ userId: '123' }),
  useNavigate: jest.fn(),
}));

const mockUserData = {
  id: 123,
  name: "John Doe",
  division: "Engineering",
  position: "Developer",
  image: "image_url.jpg",
};

beforeEach(() => {
  global.fetch = jest.fn();
  global.fetch.mockImplementation(() =>
    Promise.resolve({
      ok: true,
      text: () => Promise.resolve(JSON.stringify(mockUserData)),
    })
  );
});

describe('Home Component', () => {

  const renderHomeComponent = () => render(
	  <Router>
		  <Home />
	  </Router>
	);


  test('renders without crashing', async () => {
		await act(async () => {
		  renderHomeComponent();
		});
	});

  it('fetches and displays user information successfully', async () => {
    await act(async () => {
      renderHomeComponent();
    });

    await waitFor(() => {
      expect(screen.getByText("姓名： John Doe")).toBeInTheDocument();
      expect(screen.getByText("單位： Engineering")).toBeInTheDocument();
      expect(screen.getByText("職稱： Developer")).toBeInTheDocument();
      // Additional checks for each piece of user data
    });
  });
});
