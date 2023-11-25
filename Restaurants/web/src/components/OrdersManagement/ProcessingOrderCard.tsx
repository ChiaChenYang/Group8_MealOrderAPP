import React from 'react';
import { useState } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import { Box, Paper, Typography, Button, Modal, Switch } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useTheme } from '@mui/material/styles';
import { differenceInMinutes } from 'date-fns';

import type { ProcessingOrderType } from '@/lib/types';

interface ProcessingOrderCardProps {
	order: ProcessingOrderType;
}

type ModalBodyProps = {
	order: ProcessingOrderType;
	handleClose: () => void;
};

const createItemsString = (items: { itemName: string; number: number }[]): string => {
	return items.map((item) => `${item.itemName} * ${item.number}`).join('、');
};
const calculateRemainingTime = (orderTime: Date | string): number => {
	const now = new Date();
	const orderDate = new Date(orderTime);
	return differenceInMinutes(orderDate, now);
};

function ModalBody({ order, handleClose }: ModalBodyProps) {
	const theme = useTheme();
	const [isFinished, setIsFinished] = useState(false);
	const [delay, setDelay] = useState(0);

	function handleSave() {
		console.log('Posting to backend with: ', isFinished, delay);
		handleClose();
	}

	return (
		<Box
			sx={{
				position: 'absolute',
				top: '50%',
				left: '50%',
				transform: 'translate(-50%, -50%)',
				width: 350,
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
						fontSize: '18px',
					}}
				>
					{`剩餘時間：${calculateRemainingTime(order.orderTime)} 分鐘`}
				</Typography>
				<CloseIcon
					onClick={handleClose}
					sx={{
						cursor: 'pointer',
					}}
				/>
			</Box>

			<Box sx={{ marginLeft: 2, marginTop: 2 }}>
				{order.orderItems.map((item, index) => (
					<Box key={index}>
						<Typography
							variant="body1"
							sx={{
								fontWeight: 'bold',
								fontSize: '16px',
							}}
						>
							{item.number}x &nbsp;&nbsp;&nbsp; {item.itemName}
						</Typography>
						<Typography
							variant="body2"
							sx={{
								color: 'text.secondary',
								fontSize: '14px',
								marginLeft: 4.7,
							}}
						>
							{item.remark}
						</Typography>
					</Box>
				))}
				<br></br>
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
					{`總金額： ${order.totalPrice}`}
				</Typography>
				<br></br>
				<Box className="flex">
					<Typography
						variant="body2"
						sx={{
							mt: 1,
							fontWeight: 'regular',
							fontSize: '14px',
						}}
					>
						訂單已準備完畢
					</Typography>
					<Switch onChange={(e) => setIsFinished(e.target.checked)} />
				</Box>

				{!isFinished && (
					<Box>
						<FormControl variant="standard" sx={{ width: 150 }}>
							<InputLabel id="delay-label">延時</InputLabel>
							<Select
								labelId="delay-label"
								id="delay-select"
								value={delay}
								label="分鐘"
								onChange={(e) => setDelay(e.target.value as number)}
							>
								{[0, 10, 20, 30, 40, 50, 60].map((time) => (
									<MenuItem key={time} value={time}>
										{time} 分鐘
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Box>
				)}
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

export default function ProcessingOrderCard({ order }: ProcessingOrderCardProps) {
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
					{`剩餘時間：${calculateRemainingTime(order.orderTime)} 分鐘`}
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
				<ModalBody order={order} handleClose={handleClose} />
			</Modal>
		</Paper>
	);
}
