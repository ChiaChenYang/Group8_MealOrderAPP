import React from 'react';

import StarOutlineIcon from '@mui/icons-material/StarOutline';
import StarRateIcon from '@mui/icons-material/StarRate';
import { Box, Paper, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { format } from 'date-fns';

import type { HistoryOrderCardProps } from '@/lib/types';
import formatId from '@/lib/utils/formatId';

export default function HistoryCard({ order }: HistoryOrderCardProps) {
	const theme = useTheme();

	const createItemsString = (items: { itemName: string; number: number }[]): string => {
		return items.map((item) => `${item.itemName} * ${item.number}`).join('、');
	};

	const renderRating = (rating: number) => {
		const MAX_RATING = 5;
		const stars = [];
		for (let i = 1; i <= MAX_RATING; i++) {
			stars.push(
				i <= rating ? (
					<StarRateIcon key={i} sx={{ color: '#F4B63D', margin: 0.4 }} />
				) : (
					<StarOutlineIcon key={i} sx={{ color: '#F4B63D' }} />
				),
			);
		}
		return stars;
	};

	return (
		<Paper
			sx={{
				mb: 2,
				mr: 1.5,
				ml: 1.5,
				p: 2,
				borderRadius: '16px',
				backgroundColor: '#ffffff',
				height: '150px',
			}}
			elevation={3}
		>
			<Box className="flex justify-between">
				<Box
					sx={{
						width: '40%',
						bgcolor: theme.palette.primary.main,
						color: 'white',
						borderRadius: '16px',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<Typography variant="subtitle1">{`${formatId(order.orderId)}`}</Typography>
				</Box>

				<Box
					sx={{
						width: '40%',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						paddingRight: 5,
					}}
				>
					{renderRating(order.rating || 0)}
				</Box>
			</Box>

			<Box sx={{ marginLeft: 2 }}>
				<Typography
					variant="body2"
					sx={{
						display: 'block',
						mt: 1.5,
						overflow: 'hidden',
						textOverflow: 'ellipsis',
						fontWeight: 'bold',
						fontSize: '14px',
					}}
				>
					{`品項：${createItemsString(order.orderItems)}`}
				</Typography>
				<Box className="flex justify-between">
					<Typography
						variant="body2"
						sx={{
							mt: 1,
							fontWeight: 'bold',
							fontSize: '14px',
						}}
					>
						{`評價: ${order.comment || ''}`}
					</Typography>
				</Box>
				<Box className="flex justify-between">
					<Typography
						variant="body2"
						sx={{
							mt: 1,
							fontWeight: 'bold',
							fontSize: '14px',
						}}
					>
						{`訂單日期: ${format(order.orderTime, 'MM/dd')}`}
					</Typography>
				</Box>
			</Box>
		</Paper>
	);
}
