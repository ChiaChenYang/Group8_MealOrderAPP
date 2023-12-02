'use client';

import React from 'react';
import { useState } from 'react';

import StarRateIcon from '@mui/icons-material/StarRate';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Pagination from '@mui/material/Pagination';
import Select from '@mui/material/Select';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import HistoryOrderCard from '@/components/OperationsManagement/HistoryOrderCard';
import SortFilterOrderList from '@/lib/SortFilterOrderList';
import type { HistoryOrderList, HistoryOrderType, HistoryRating } from '@/lib/types';

const sampleOrderList: HistoryOrderList = [
	{
		orderId: 12345678,
		type: 'completed',
		orderItems: [
			{ itemName: '麵', number: 2, remark: '小辣' },
			{ itemName: '飯', number: 5, remark: '小辣' },
		],
		totalPrice: 188,
		orderTime: new Date('2023-11-02T11:55:00'),
		rating: 3,
		comment: '好吃',
	},
	{
		orderId: 23456789,
		type: 'completed',
		orderItems: [
			{ itemName: '麵', number: 2, remark: '小辣' },
			{ itemName: '飯', number: 5, remark: '小辣' },
		],
		totalPrice: 391,
		orderTime: new Date('2023-11-02T11:55:00'),
		rating: 4,
		comment: '好吃',
	},
	{
		orderId: 34567891,
		type: 'completed',
		orderItems: [
			{ itemName: '麵', number: 2, remark: '小辣' },
			{ itemName: '飯', number: 5, remark: '小辣' },
		],
		totalPrice: 139,
		orderTime: new Date('2023-11-02T11:55:00'),
		rating: 5,
		comment: '好吃',
	},
	{
		orderId: 45678912,
		type: 'completed',
		orderItems: [
			{ itemName: '麵', number: 2, remark: '小辣' },
			{ itemName: '飯', number: 5, remark: '小辣' },
		],
		totalPrice: 139,
		orderTime: new Date('2023-11-02T11:55:00'),
		rating: 5,
		comment: '好吃',
	},
	{
		orderId: 56789123,
		type: 'completed',
		orderItems: [
			{ itemName: '麵', number: 2, remark: '小辣' },
			{ itemName: '飯', number: 5, remark: '小辣' },
		],
		totalPrice: 139,
		orderTime: new Date('2023-11-02T11:55:00'),
		rating: 1,
		comment: '不好吃',
	},
	{
		orderId: 67891234,
		type: 'completed',
		orderItems: [
			{ itemName: '麵', number: 2, remark: '小辣' },
			{ itemName: '飯', number: 5, remark: '小辣' },
		],
		totalPrice: 139,
		orderTime: new Date('2023-11-02T11:55:00'),
		rating: 5,
		comment: '好吃',
	},
	{
		orderId: 78912345,
		type: 'completed',
		orderItems: [
			{ itemName: '麵', number: 2, remark: '小辣' },
			{ itemName: '飯', number: 5, remark: '小辣' },
		],
		totalPrice: 139,
		orderTime: new Date('2023-11-02T11:55:00'),
		rating: 5,
		comment: '好吃',
	},
	{
		orderId: 89123456,
		type: 'completed',
		orderItems: [
			{ itemName: '麵', number: 2, remark: '小辣' },
			{ itemName: '飯', number: 5, remark: '小辣' },
		],
		totalPrice: 139,
		orderTime: new Date('2023-11-02T11:55:00'),
		rating: 5,
		comment: '好吃',
	},
];

const sampleHistoryRating: HistoryRating = [4.3, 3.8, 4.0];

export default function Management() {
	const ordersPerPage = 6;
	const [page, setPage] = useState(1);
	const [sortBy, setSortBy] = useState('orderTime');

	const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
		setPage(value);
	};

	const sortAndFilteredOrders = SortFilterOrderList(sampleOrderList, sortBy, '');
	const count = Math.ceil(sortAndFilteredOrders.length / ordersPerPage);

	const indexOfLastOrder = page * ordersPerPage;
	const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
	const currentOrders = sortAndFilteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
	const renderRatingWithStars = (rating: number) => {
		return (
			<Box className="flex items-center">
				<Typography className="pr-2 pt-1 text-white" variant="h5">
					{rating.toFixed(1)}
				</Typography>
				<StarRateIcon sx={{ color: '#F4B63D' }} fontSize="large" />
			</Box>
		);
	};
	const renderTrendingIcon = () => {
		if (sampleHistoryRating[2] > sampleHistoryRating[1]) {
			return <TrendingUpIcon fontSize="large" sx={{ color: '#1BF831', fontSize: '4rem' }} />;
		} else if (sampleHistoryRating[2] < sampleHistoryRating[1]) {
			return (
				<TrendingDownIcon fontSize="large" sx={{ color: '#F81B1B', fontSize: '4rem' }} />
			);
		}
		return null;
	};
	return (
		<Box className="flex w-full flex-col items-center overflow-scroll bg-white">
			<Box className="h-[15%] w-full">
				<AppBar position="static" color="primary" sx={{ width: '100%', height: '15vh' }}>
					<Toolbar className="mx-10 my-5 flex h-full justify-between">
						<Box className="flex flex-col items-center">
							<Typography className="text-white" variant="h5">
								歷史評價
							</Typography>
							{renderRatingWithStars(sampleHistoryRating[0])}
						</Box>

						<Box className="flex flex-col items-center">
							<Typography className="text-white" variant="h5">
								上月評價
							</Typography>
							{renderRatingWithStars(sampleHistoryRating[1])}
						</Box>

						<Box className="flex flex-col items-center">
							<Typography className="text-white" variant="h5">
								本月評價
							</Typography>
							{renderRatingWithStars(sampleHistoryRating[2])}
						</Box>
						<Box className="flex pr-20">{renderTrendingIcon()}</Box>
						<Select
							className="color-gray z-10 w-1/5 bg-white "
							labelId="sort-label"
							id="sort-select"
							value={sortBy}
							onChange={(e) => setSortBy(e.target.value)}
						>
							<MenuItem key="orderTime" value="orderTime">
								訂單日期
							</MenuItem>
							<MenuItem key="ratingHigh" value="ratingHigh">
								評價由高到低
							</MenuItem>
							<MenuItem key="ratingLow" value="ratingLow">
								評價由低到高
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
						<HistoryOrderCard key={order.orderId} order={order as HistoryOrderType} />
					))}
				</Box>
			</Box>
			<Pagination className="mb-5" count={count} page={page} onChange={handleChange} />
		</Box>
	);
}
