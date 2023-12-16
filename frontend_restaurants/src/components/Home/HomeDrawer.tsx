import React from 'react';

import { Drawer, List, ListItem, Button } from '@mui/material';
import { Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';

import type { HomeDrawer } from '@/lib/types';

export default function HomeDrawer({ activePage }: HomeDrawer) {
	const getButtonVariant = (page: string) => (activePage === page ? 'contained' : 'text');
	const theme = useTheme();
	const drawerWidth = 255;
	const pageUrls = {
		首頁: '/home',
		訂單管理: '/orders-management/incoming-orders',
		菜單管理: '/menus-management/menus',
		營運管理: '/operations-management/basic-information',
	};

	return (
		<Drawer
			variant="permanent"
			className="flex w-full items-center justify-center"
			sx={{
				zIndex: theme.zIndex.drawer + 1,
				[`& .MuiDrawer-paper`]: {
					justifyContent: 'space-around',
					width: drawerWidth,
					boxSizing: 'border-box',
					top: 0,
					backgroundColor: theme.palette.background.default,
				},
			}}
		>
			<List className="flex w-full flex-col justify-center">
				<ListItem className="my-2">
					<Box textAlign="center" className="w-full flex-1">
						<Avatar
							alt="Logo"
							src="/logo.png"
							sx={{
								marginX: 'auto',
								width: 200,
								height: 200,
								marginBottom: '20px',
							}}
						/>
						<Box mt={2}>
							<Typography variant="h4" fontWeight="bold" align="center">
								快點
							</Typography>
						</Box>
					</Box>
				</ListItem>

				{Object.entries(pageUrls).map(([text, url]) => (
					<ListItem key={text} disablePadding className="my-2 flex-1">
						<Box textAlign="center" sx={{ width: '100%', padding: theme.spacing(2) }}>
							<Button
								role="button"
								variant={getButtonVariant(text)}
								href={url}
								className="w-4/5 rounded-2xl px-2 py-3 text-2xl"
								sx={{
									...(getButtonVariant(text) === 'contained' && {
										color: 'white',
										backgroundColor: `${theme.palette.primary.main} !important`,
										'&:hover': {
											backgroundColor: `${theme.palette.primary.main} !important`,
										},
									}),
									...(getButtonVariant(text) === 'text' && {
										color: `${theme.palette.text.secondary} !important`,
									}),
								}}
							>
								{text}
							</Button>
						</Box>
					</ListItem>
				))}
			</List>
		</Drawer>
	);
}
