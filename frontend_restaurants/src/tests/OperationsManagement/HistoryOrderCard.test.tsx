import React from 'react';

import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

import HistoryCard from '@/components/OperationsManagement/HistoryOrderCard';

const order = {
	orderId: 1234,
	rating: 4,
	comment: 'Great service',
	orderTime: new Date('2023-02-14T12:34:56Z'),
	finishTime: new Date('2023-02-14T12:34:56Z'),
	completeTime: new Date('2023-02-14T12:34:56Z'),
	type: '',
	orderItems: [
		{
			itemName: 'Pizza',
			number: 2,
			remark: 'extra cheese',
		},
		{
			itemName: 'Fries',
			number: 1,
		},
	],
	totalPrice: 25.99,
	noteFromUser: 'Please deliver to the back door.',
};

describe('HistoryCard', () => {
	test('should render order id', () => {
		const { getByText } = render(<HistoryCard order={order} />);
		expect(getByText('#00001234')).toBeInTheDocument();
	});

	test('should render rating', () => {
		const { container } = render(<HistoryCard order={order} />);
		expect(container.querySelector('svg')).toBeInTheDocument();
	});

	test('should render order items', () => {
		const { getByText } = render(<HistoryCard order={order} />);
		expect(getByText('品項：Pizza * 2、Fries * 1')).toBeInTheDocument();
	});

	test('should render comment', () => {
		const { getByText } = render(<HistoryCard order={order} />);
		expect(getByText('評價: Great service')).toBeInTheDocument();
	});

	test('should render order date', () => {
		const { getByText } = render(<HistoryCard order={order} />);
		expect(getByText('訂單日期: 02/14')).toBeInTheDocument();
	});
});
