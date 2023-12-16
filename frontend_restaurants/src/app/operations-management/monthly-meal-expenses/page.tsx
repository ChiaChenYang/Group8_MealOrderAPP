'use client';

import React from 'react';

import { redirect } from 'next/navigation';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

import RestaurantStatistics from '@/components/OperationsManagement/RestaurantStatistics';
import useRedirect from '@/hooks/useRedirect';

export default function Management() {
	const { isRedirecting, redirectURL } = useRedirect();
	if (isRedirecting) redirect(redirectURL);

	return (
		<Box className="flex w-full flex-col items-center overflow-scroll bg-white">
			<Box className="h-[15%] w-full">
				<AppBar position="static" color="primary" sx={{ width: '100%', height: '15vh' }}>
					<Toolbar />
				</AppBar>
			</Box>
			<Box
				sx={{
					height: '85%',
					width: '80%',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					mt: 4,
					backgroundColor: '#FFFFFF',
				}}
			>
				<RestaurantStatistics />
			</Box>
		</Box>
	);
}
