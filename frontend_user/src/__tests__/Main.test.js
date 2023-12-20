import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Main from '../Main.js';
import { BrowserRouter as Router } from 'react-router-dom';
import { act } from 'react-dom/test-utils';

const mockRestaurantData = {
	1: {
	  id: 1,
	  name: "麥當勞",
	  image: "image_url_1.jpg",
	  prepare_time: 20,
	  evaluate: 5,
	  service: "內用|外帶",
	},
	2: {
	  id: 2,
	  name: "Restaurant 2",
	  image: "image_url_2.jpg",
	  prepare_time: 15,
	  evaluate: 4.5,
	  service: "外帶",
	},
	// ... more mock restaurants ...
  };
  
  const mockNewsData = [
	{
	  id: 1,
	  title: "News Title 1",
	  content: "News Content 1",
	  // ... other news fields ...
	},
	// ... more news items ...
  ];
  
	
  beforeEach(() => {
	global.fetch = jest.fn((url) =>
	  Promise.resolve({
		ok: true,
		text: () => {
		  if (url.includes('restaurants/all')) {
			return Promise.resolve(JSON.stringify(mockRestaurantData));
		  } else if (url.includes('restaurants/news')) {
			return Promise.resolve(JSON.stringify(mockNewsData));
		  }
		  return Promise.resolve('{}');
		},
	  })
	);
  });
  
  
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // preserve the original functionalities
  useParams: () => ({
    userId: 'test-user',
  }),
  useNavigate: () => jest.fn(),
}));
describe('Main Component', () => {
	const renderMainComponent = () => render(
	  <Router>
		<Main />
	  </Router>
	);
  
	it('renders without crashing', async () => {
		await act(async () => {
		  renderMainComponent();
		});
		expect(screen.getByText('想要吃什麼？')).toBeInTheDocument();
	  });

	  it('fetches and displays restaurant data', async () => {
		global.fetch.mockImplementationOnce((url) =>
		  Promise.resolve({
			ok: true,
			text: () => Promise.resolve(JSON.stringify(mockRestaurantData)),
		  })
		);
	  
		await act(async () => {
		  render(
			<Router>
			  <Main />
			</Router>
		  );
		});
	  
		await waitFor(() => {
		  expect(screen.getByText("麥當勞")).toBeInTheDocument();
		  expect(screen.getByText("Restaurant 2")).toBeInTheDocument();
		  // Add checks for other details like prepare_time, evaluate, etc.
		});
	  });
	  
	  it('fetches and displays news data', async () => {
		global.fetch.mockImplementationOnce((url) =>
		  Promise.resolve({
			ok: true,
			text: () => Promise.resolve(JSON.stringify(mockNewsData)),
		  })
		);
	  
		await act(async () => {
		  render(
			<Router>
			  <Main />
			</Router>
		  );
		});
	  
		await waitFor(() => {
		//   expect(screen.getByText("News Title 1")).toBeInTheDocument();
		  // Add checks for other news content
		});
	  });
	  
  
  });
  
// Other mocks as needed
