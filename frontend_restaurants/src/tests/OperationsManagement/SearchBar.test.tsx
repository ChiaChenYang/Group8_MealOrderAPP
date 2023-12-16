import React from 'react';

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import SearchBar from '@/components/OperationsManagement/SearchBar';

describe('SearchBar', () => {
	it('should render SearchBar component', () => {
		render(<SearchBar searchText="text" setSearchText={() => {}} />);

		const searchBar = screen.getByRole('searchbox');
		expect(searchBar).toBeInTheDocument();
	});

	it('should render SearchIcon component', () => {
		const { container } = render(<SearchBar searchText="text" setSearchText={() => {}} />);
		expect(container.querySelector('svg')).toBeInTheDocument();
	});

	it('should have placeholder text', () => {
		render(<SearchBar searchText="text" setSearchText={() => {}} />);

		const placeholder = screen.getByPlaceholderText('Search…');
		expect(placeholder).toBeInTheDocument();
	});

	it('should have input value', () => {
		render(<SearchBar searchText="text" setSearchText={() => {}} />);

		const input = screen.getByRole('textbox');
		expect(input).toHaveValue('text');
	});
});
