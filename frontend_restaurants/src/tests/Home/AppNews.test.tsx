/**
 * @jest-environment jsdom
 */
import * as React from 'react';

import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';

import AppNews from '@/components/Home/AppNews';

const images = [
	{
		label: '最新消息1',
		imgPath:
			'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
	},
	{
		label: '最新消息2',
		imgPath:
			'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60',
	},
	{
		label: '最新消息3',
		imgPath:
			'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250',
	},
	{
		label: '最新消息4',
		imgPath:
			'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
	},
];

describe('AppNews', () => {
	test('renders the news title', () => {
		const { getByText } = render(<AppNews />);
		const title = getByText('最新消息1');
		expect(title).toBeInTheDocument();
	});

	test('renders the next button', () => {
		const { getByText } = render(<AppNews />);
		const nextButton = getByText('Next');
		expect(nextButton).toBeInTheDocument();
	});

	test('clicking the next button advances to the next slide', () => {
		const { getByText, container } = render(<AppNews />);
		const nextButton = getByText('Next');
		fireEvent.click(nextButton);
		expect(container.querySelector('img')).toHaveAttribute('src', images[1].imgPath);
	});

	test('clicking the back button goes to the previous slide', () => {
		const { getByText, container } = render(<AppNews />);
		const backButton = getByText('Back');
		fireEvent.click(backButton);
		expect(container.querySelector('img')).toHaveAttribute('src', images[0].imgPath);
	});
});
