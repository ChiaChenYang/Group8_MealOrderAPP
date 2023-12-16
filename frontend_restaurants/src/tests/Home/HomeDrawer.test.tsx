import React from 'react';

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import HomeDrawer from '@/components/Home/HomeDrawer';

describe('HomeDrawer', () => {
	test('should render an Avatar component', () => {
		render(<HomeDrawer activePage={'首頁'} />);
		const avatar = screen.getByAltText('Logo');
		expect(avatar).toBeInTheDocument();
	});

	test('should render a List component', () => {
		render(<HomeDrawer activePage={'首頁'} />);
		const list = screen.getByRole('list');
		expect(list).toBeInTheDocument();
	});

	test('should render a ListItem component for each page', () => {
		render(<HomeDrawer activePage={'首頁'} />);
		const listItems = screen.getAllByRole('listitem');
		expect(listItems).toHaveLength(5);
	});

	test('should render a Button component for each page', () => {
		render(<HomeDrawer activePage={'首頁'} />);
		const buttons = screen.getAllByRole('button');
		expect(buttons).toHaveLength(4);
	});

	test('should render a primary button for the active page', () => {
		const activePage = '首頁';
		render(<HomeDrawer activePage={activePage} />);
		const button = screen.getByRole('button', { name: activePage });
		expect(button).toHaveClass('MuiButton-contained');
	});

	test('should render a secondary button for the inactive pages', () => {
		const activePage = '首頁';
		const inactivePages = ['訂單管理', '菜單管理', '營運管理'];
		render(<HomeDrawer activePage={activePage} />);
		inactivePages.forEach((page) => {
			const button = screen.getByRole('button', { name: page });
			expect(button).toHaveClass('MuiButton-text');
		});
	});
});
