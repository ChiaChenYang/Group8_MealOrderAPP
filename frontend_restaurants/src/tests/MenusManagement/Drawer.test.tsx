import React from 'react';

import { usePathname } from 'next/navigation';

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import MenuManagementDrawer from '@/components/MenusManagement/Drawer';

jest.mock('next/navigation', () => ({
	usePathname: jest.fn(),
}));
const mockedUsePathname = usePathname as jest.MockedFunction<typeof usePathname>;

describe('MenuManagementDrawer', () => {
	test('should render a Drawer component', () => {
		mockedUsePathname.mockReturnValue('/some/path');
		render(<MenuManagementDrawer />);

		const drawer = screen.getByTestId('menu-management-drawer');

		expect(drawer).toBeInTheDocument();
		expect(drawer).toHaveClass('MuiDrawer-root');
	});

	test('should render an IconButton component', () => {
		mockedUsePathname.mockReturnValue('/some/path');

		render(<MenuManagementDrawer />);

		const iconButton = screen.getByTestId('menu-management-drawer-back-button');

		expect(iconButton).toBeInTheDocument();
		expect(iconButton).toHaveClass('MuiIconButton-root');
	});

	test('should render a Typography component', () => {
		mockedUsePathname.mockReturnValue('/some/path');

		render(<MenuManagementDrawer />);

		const title = screen.getByTestId('menu-management-drawer-title');

		expect(title).toBeInTheDocument();
		expect(title).toHaveClass('MuiTypography-h4');
	});

	test('should render a List component', () => {
		mockedUsePathname.mockReturnValue('/some/path');

		render(<MenuManagementDrawer />);

		const list = screen.getByTestId('menu-management-drawer-list');

		expect(list).toBeInTheDocument();
		expect(list).toHaveClass('MuiList-root');
	});

	test('should render a ListItem component', () => {
		mockedUsePathname.mockReturnValue('/some/path');

		render(<MenuManagementDrawer />);

		const listItem = screen.getAllByTestId('menu-management-drawer-list-item')[0];

		expect(listItem).toBeInTheDocument();
		expect(listItem).toHaveClass('MuiListItem-root');
	});

	test('should render a Button component', () => {
		mockedUsePathname.mockReturnValue('/some/path');

		render(<MenuManagementDrawer />);

		const button = screen.getAllByTestId('menu-management-drawer-button')[0];

		expect(button).toBeInTheDocument();
		expect(button).toHaveClass('MuiButtonBase-root');
	});
});
