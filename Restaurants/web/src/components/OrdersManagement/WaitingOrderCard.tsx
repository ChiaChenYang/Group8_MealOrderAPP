import React from 'react';
import { useState } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import { Box, Paper, Typography, Button, Modal, Switch } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import type { Theme } from '@mui/material/styles';
import { format } from 'date-fns';

import type { WaitingOrderType, WaitingOrderCardProps } from '@/lib/types';

type ModalBodyProps = {
	order: WaitingOrderType;
	theme: Theme;
	handleClose: () => void;
};

const createItemsString = (items: { itemName: string; number: number }[]): string => {
	return items.map((item) => `${item.itemName} * ${item.number}`).join('、');
};

function ModalBody({ order, theme, handleClose }: ModalBodyProps) {
	const [isPickuped, setIsPickuped] = useState(false);

	function handleSave() {
		console.log('Posting to backend with: ', isPickuped);
		handleClose();
	}

	return (
		<Box
			sx={{
				position: 'absolute',
				top: '50%',
				left: '50%',
				transform: 'translate(-50%, -50%)',
				width: 400,
				bgcolor: 'background.paper',
				border: '2px solid #000',
				boxShadow: 24,
				p: 2,
				borderRadius: '16px',
				borderColor: `${theme.palette.primary.main} `,
			}}
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
					<Typography variant="subtitle1">{`#${order.orderId}`}</Typography>
				</Box>

				<Typography
					sx={{
						fontWeight: 'bold',
						fontSize: '24px',
					}}
				>
					{`出餐時間：${format(order.finishTime, 'HH:mm')}`}
				</Typography>
				<CloseIcon onClick={handleClose} sx={{ cursor: 'pointer' }} />
			</Box>

			<Box className="ml-2 mt-2">
				<Typography
					variant="body1"
					sx={{
						fontWeight: 'bold',
						fontSize: '16px',
					}}
				>
					品項：
				</Typography>
				{order.orderItems.map((item, index) => (
					<Box key={index}>
						<Typography
							variant="body1"
							sx={{
								fontWeight: 'bold',
								fontSize: '16px',
							}}
						>
							{`${item.itemName} * ${item.number}`}
						</Typography>
						<Typography
							variant="body2"
							sx={{
								color: 'text.secondary',
								fontSize: '14px',
							}}
						>
							{item.remark}
						</Typography>
					</Box>
				))}
				{order.noteFromUser && (
					<Typography
						variant="body2"
						sx={{
							color: 'text.secondary',
							mt: 1,
							fontWeight: 'regular',
							fontSize: '14px',
						}}
					>
						{`備註：${order.noteFromUser}`}
					</Typography>
				)}

				<Typography
					variant="body2"
					sx={{
						mt: 1,
						fontWeight: 'bold',
						fontSize: '14px',
					}}
				>
					{`總金額: ${order.totalPrice}`}
				</Typography>
			</Box>
			<Box className="ml-2 mt-2 flex justify-start">
				<Typography
					variant="body2"
					sx={{
						mt: 1,
						fontWeight: 'regular',
						fontSize: '14px',
					}}
				>
					確認客人已取餐
				</Typography>
				<Switch className="ml-2" onChange={(e) => setIsPickuped(e.target.checked)} />
			</Box>
			<Box className="flex justify-end" sx={{ mt: 2 }}>
				<Button
					variant="contained"
					color="primary"
					sx={{
						borderColor: `${theme.palette.primary.main} !important`,
						bgcolor: `${theme.palette.primary.main} !important`,
						color: 'white',
						borderRadius: 5,
					}}
					onClick={handleSave}
				>
					儲存
				</Button>
			</Box>
		</Box>
	);
}

export default function WaitingOrderCard({ order }: WaitingOrderCardProps) {
	const theme = useTheme();
	const [open, setOpen] = useState(false);

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

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
					<Typography variant="subtitle1">{`#${order.orderId}`}</Typography>
				</Box>

				<Typography
					sx={{
						fontWeight: 'bold',
						fontSize: '24px',
					}}
				>
					{`出餐時間：${format(order.finishTime, 'HH:mm')}`}
				</Typography>
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
				{order.noteFromUser && (
					<Typography
						variant="body2"
						sx={{
							color: 'text.secondary',
							mt: 1,
							fontWeight: 'regular',
							fontSize: '14px',
						}}
					>
						{`備註: ${order.noteFromUser}`}
					</Typography>
				)}

				<Box className="flex justify-between">
					<Typography
						variant="body2"
						sx={{
							mt: 1,
							fontWeight: 'bold',
							fontSize: '14px',
						}}
					>
						{`總金額: ${order.totalPrice}`}
					</Typography>
					<Button onClick={handleOpen}>詳細資訊</Button>
				</Box>
			</Box>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<ModalBody order={order} theme={theme} handleClose={handleClose} />
			</Modal>
		</Paper>
	);
}
