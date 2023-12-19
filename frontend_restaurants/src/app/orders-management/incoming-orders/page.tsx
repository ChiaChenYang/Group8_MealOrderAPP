'use client';

import React, { useEffect } from 'react';
import { useState } from 'react';

import { redirect } from 'next/navigation';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Pagination from '@mui/material/Pagination';
import Select from '@mui/material/Select';
import Toolbar from '@mui/material/Toolbar';
import { io } from 'socket.io-client';

import IncomingOrderCard from '@/components/OrdersManagement/IncomingOrderCard';
import SearchBar from '@/components/OrdersManagement/SearchBar';
import useRedirect from '@/hooks/useRedirect';
import { getIncomingOrders } from '@/lib/api/orders/api';
import type { IncomingOrderList, IncomingOrderType } from '@/lib/types';
import SortFilterOrderList from '@/lib/utils/SortFilterOrderList';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3000/';

export default function Management() {
	const { isRedirecting, redirectURL, restaurantId } = useRedirect();
	if (isRedirecting) redirect(redirectURL);
	const [orderList, setOrderList] = useState<IncomingOrderList>([]);
	const [refreshKey, setRefreshKey] = useState(0);

	useEffect(() => {
		if (restaurantId < 0) return;
		const socket = io(BACKEND_URL);

		socket.on(`${restaurantId} incoming orders`, () => {
			setRefreshKey((prev) => prev + 1);
		});

		return () => {
			socket.disconnect();
		};
	}, [restaurantId]);

	useEffect(() => {
		const getData = async () => {
			const orders = await getIncomingOrders(restaurantId);
			const displayOrders = orders.map((order) => ({
				...order,
				orderTime: new Date(order.orderTime),
			}));
			setOrderList(displayOrders);
		};
		if (restaurantId !== -1) getData();
	}, [restaurantId, refreshKey]);

	const ordersPerPage = 6;
	const [page, setPage] = useState(1);
	const [sortBy, setSortBy] = useState('orderTime');
	const [searchText, setSearchText] = useState('');

	const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
		setPage(value);
	};

	const sortAndFilteredOrders = SortFilterOrderList(orderList, sortBy, searchText);
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
						<IncomingOrderCard
							key={order.orderId}
							order={order as IncomingOrderType}
							setRefreshKey={setRefreshKey}
						/>
					))}
				</Box>
			</Box>
			<Pagination className="mb-5" count={count} page={page} onChange={handleChange} />
		</Box>
	);
}
