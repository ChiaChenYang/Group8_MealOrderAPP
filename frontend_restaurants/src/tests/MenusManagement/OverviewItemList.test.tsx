import React from 'react';

import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';

import OverviewItemList from '@/components/MenusManagement/OverviewItemList';
import { SingleItem } from '@/components/MenusManagement/OverviewItemList';

const menu = {
	menuId: 1,
	menuName: 'Test Menu',
	categories: [
		{ categoryId: 1, categoryName: 'Category 1', items: [] },
		{ categoryId: 2, categoryName: 'Category 2', items: [] },
	],
};

const emptyMenu = {
	menuId: 2,
	menuName: 'Empty Menu',
	categories: [],
};

describe('OverviewItemList', () => {
	test('should render category 1 when category is "2"', () => {
		const { getByText, queryByText } = render(
			<OverviewItemList menu={menu} category="Category 1" />,
		);
		expect(getByText('Category 1')).toBeVisible();
		expect(queryByText('Category 2')).not.toBeInTheDocument();
	});

	test('should render selected category when category is not "All"', () => {
		const { getByText } = render(<OverviewItemList menu={menu} category="Category 2" />);
		expect(getByText('Category 2')).toBeVisible();
	});

	test('should not render any category when menu is empty', () => {
		const { queryByText } = render(<OverviewItemList menu={emptyMenu} category="All" />);
		expect(queryByText('Category 1')).not.toBeInTheDocument();
		expect(queryByText('Category 2')).not.toBeInTheDocument();
	});

	test('should render default item image when item does not have an image', () => {
		const item = {
			itemId: 1,
			itemName: 'Item 1',
			itemPrice: 10,
			itemDescription: 'This is an item description.',
			itemImage: undefined,
			itemCalories: 100,
			itemTags: ['Tag 1', 'Tag 2'],
		};
		const { getByAltText } = render(<SingleItem item={item} />);
		expect(getByAltText('Item 1')).toBeVisible();
	});

	test('should render item calories as a circle with the correct color', () => {
		const item = {
			itemId: 1,
			itemName: 'Item 1',
			itemPrice: 10,
			itemDescription: 'This is an item description.',
			itemImage: undefined,
			itemCalories: 500,
			itemTags: ['Tag 1', 'Tag 2'],
		};
		const { getByTestId } = render(<SingleItem item={item} />);
		const circle = getByTestId('circle');
		expect(circle).toHaveStyle('border-radius:50%');
		expect(circle).toHaveStyle('width:10px');
		expect(circle).toHaveStyle('height:10px');
		expect(circle).toHaveStyle('background-color:yellow');
	});

	test('should show up to three item tags and ellipsize if there are more than three tags', () => {
		const item = {
			itemId: 1,
			itemName: 'Item 1',
			itemPrice: 10,
			itemDescription: 'This is an item description.',
			itemImage: undefined,
			itemCalories: 500,
			itemTags: ['Tag 1', 'Tag 2', 'Tag 3', 'Tag 4', 'Tag 5'],
		};
		const { getByText } = render(<SingleItem item={item} />);
		expect(getByText('Tag 1')).toBeVisible();
		expect(getByText('Tag 2')).toBeVisible();
		expect(getByText('Tag 3')).toBeVisible();
		expect(getByText('Tag 4')).not.toBeVisible();
		expect(getByText('Tag 5')).not.toBeVisible();
	});

	test('should open a modal when the item is clicked', () => {
		const item = {
			itemId: 1,
			itemName: 'Item 1',
			itemPrice: 10,
			itemDescription: 'This is an item description.',
			itemImage: undefined,
			itemCalories: 500,
			itemTags: ['Tag 1', 'Tag 2', 'Tag 3', 'Tag 4', 'Tag 5'],
		};
		const { getByTestId, queryByText } = render(<SingleItem item={item} />);
		fireEvent.click(getByTestId('item'));
		expect(queryByText('新增備註')).toBeVisible();
	});

	test('should close the modal when the close button is clicked', () => {
		const item = {
			itemId: 1,
			itemName: 'Item 1',
			itemPrice: 10,
			itemDescription: 'This is an item description.',
			itemImage: undefined,
			itemCalories: 500,
			itemTags: ['Tag 1', 'Tag 2', 'Tag 3', 'Tag 4', 'Tag 5'],
		};
		const { getByTestId, queryByText } = render(<SingleItem item={item} />);
		fireEvent.click(getByTestId('item'));
		fireEvent.click(getByTestId('close-button'));
		expect(queryByText('新增備註')).toBeNull();
	});
});
