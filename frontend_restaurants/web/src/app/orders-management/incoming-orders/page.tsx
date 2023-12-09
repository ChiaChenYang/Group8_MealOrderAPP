'use client';

import React from 'react';
import { useState } from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Pagination from '@mui/material/Pagination';
import Select from '@mui/material/Select';
import Toolbar from '@mui/material/Toolbar';

import IncomingOrderCard from '@/components/OrdersManagement/IncomingOrderCard';
import SearchBar from '@/components/OrdersManagement/SearchBar';
import SortFilterOrderList from '@/lib/SortFilterOrderList';
import type { IncomingOrderList, IncomingOrderType } from '@/lib/types';

const sampleOrderList: IncomingOrderList = [
	{
		orderId: 12345678,
		type: 'incoming',
		orderTime: new Date('2023-11-02T11:15:00'),
		orderItems: [
			{ itemName: '麵', number: 2, remark: '小辣' },
			{ itemName: '飯', number: 5, remark: '小辣' },
		],
		noteFromUser: '不要飯',
		totalPrice: 149,
	},
	{
		orderId: 23456789,
		type: 'incoming',
		orderTime: new Date('2023-11-02T11:15:00'),
		orderItems: [
			{ itemName: '麵', number: 2, remark: '小辣' },
			{ itemName: '飯', number: 5, remark: '小辣' },
		],
		noteFromUser: '不要飯',
		totalPrice: 119,
	},
	{
		orderId: 34567891,
		type: 'incoming',
		orderTime: new Date('2023-11-02T11:15:00'),
		orderItems: [
			{ itemName: '麵', number: 2, remark: '小辣' },
			{ itemName: '飯', number: 5, remark: '小辣' },
		],
		noteFromUser: '不要飯',
		totalPrice: 199,
	},
	{
		orderId: 45678912,
		type: 'incoming',
		orderTime: new Date('2023-11-02T11:15:00'),
		orderItems: [
			{ itemName: '麵', number: 2, remark: '小辣' },
			{ itemName: '飯', number: 5, remark: '小辣' },
		],
		noteFromUser: '不要飯',
		totalPrice: 198,
	},
	{
		orderId: 56789123,
		type: 'incoming',
		orderTime: new Date('2023-11-02T11:15:00'),
		orderItems: [
			{ itemName: '麵', number: 2, remark: '小辣' },
			{ itemName: '飯', number: 5, remark: '小辣' },
		],
		noteFromUser: '不要飯',
		totalPrice: 177,
	},
	{
		orderId: 67891234,
		type: 'incoming',
		orderTime: new Date('2023-11-02T11:15:00'),
		orderItems: [
			{ itemName: '麵', number: 2, remark: '小辣' },
			{ itemName: '飯', number: 5, remark: '小辣' },
		],
		noteFromUser: '不要飯',
		totalPrice: 178,
	},
	{
		orderId: 78912345,
		type: 'incoming',
		orderTime: new Date('2023-11-02T11:15:00'),
		orderItems: [
			{ itemName: '麵', number: 2, remark: '小辣' },
			{ itemName: '飯', number: 5, remark: '小辣' },
		],
		noteFromUser: '不要飯',
		totalPrice: 1187,
	},
	{
		orderId: 89123456,
		type: 'incoming',
		orderTime: new Date('2023-11-02T11:15:00'),
		orderItems: [
			{ itemName: '麵', number: 2, remark: '小辣' },
			{ itemName: '飯', number: 5, remark: '小辣' },
		],
		noteFromUser: '不要飯',
		totalPrice: 1988,
	},
];

export default function Management() {
	const ordersPerPage = 6;
	const [page, setPage] = useState(1);
	const [sortBy, setSortBy] = useState('orderTime');
	const [searchText, setSearchText] = useState('');

	const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
		setPage(value);
	};

	const sortAndFilteredOrders = SortFilterOrderList(sampleOrderList, sortBy, searchText);
	const count = Math.ceil(sortAndFilteredOrders.length / ordersPerPage);

	const indexOfLastOrder = page * ordersPerPage;
	const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
	const currentOrders = sortAndFilteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

	return (
		<Box className="flex w-full flex-col items-center overflow-scroll bg-white">
			<Box className="flex h-[15%] w-full items-center">
				<AppBar
					className="z-0"
					position="static"
					color="primary"
					sx={{ width: '100%', height: '15vh' }}
				>
					<Toolbar className="mx-10 my-5 flex h-full justify-between">
						<SearchBar searchText={searchText} setSearchText={setSearchText} />
						<Select
							className="color-gray z-10 w-1/5 bg-white "
							labelId="sort-label"
							id="sort-select"
							value={sortBy}
							onChange={(e) => setSortBy(e.target.value)}
						>
							<MenuItem key="orderTime" value="orderTime">
								取餐時間
							</MenuItem>
							<MenuItem key="totalPrice" value="totalPrice">
								總金額
							</MenuItem>
						</Select>
					</Toolbar>
				</AppBar>
			</Box>
			<Box
				sx={{
					height: '85%',
					width: '90%',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					mt: 4,
					backgroundColor: '#FFFFFF',
				}}
			>
				<Box
					sx={{
						height: '90%',
						display: 'grid',
						gridTemplateColumns: 'repeat(2, 1fr)',
						gap: 4,
						width: '100%',
						marginBottom: 3,
						marginTop: 3,
						maxHeight: 0,
					}}
				>
					{currentOrders.map((order) => (
						<IncomingOrderCard key={order.orderId} order={order as IncomingOrderType} />
					))}
				</Box>
			</Box>
			<Pagination className="mb-5" count={count} page={page} onChange={handleChange} />
		</Box>
	);
}
