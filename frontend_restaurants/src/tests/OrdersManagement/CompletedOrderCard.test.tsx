import React from 'react';

import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';

import OrderCard from '@/components/OrdersManagement/CompletedOrderCard';

const order = {
	orderId: 1234,
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

describe('OrderCard', () => {
	test('should render correctly', () => {
		render(<OrderCard order={order} />);
	});

	test('should render the order details in the modal', () => {
		const { getByText, getByTestId } = render(<OrderCard order={order} />);
		fireEvent.click(getByText('詳細資訊'));
		expect(getByTestId('modal-body')).toHaveTextContent('總金額: 25.99');
	});
});
