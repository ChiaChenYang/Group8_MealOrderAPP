'use client';

import React from 'react';

import { Box, MenuItem, TextField } from '@mui/material';

import type { ItemControlSelectorProps } from '@/lib/types';

export default function ItemControlSelector({
	menuList,
	selectedMenu,
	setSelectedMenu,
}: ItemControlSelectorProps) {
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const menuValue = event.target.value;
		const selectedMenu = menuList.find((menu) => menu.menuId === Number(menuValue));
		if (selectedMenu) {
			setSelectedMenu(selectedMenu);
		}
	};

	return (
		<Box className="mt-5 flex w-full pl-[50px]">
			<TextField
				id="menu-selector"
				select
				value={selectedMenu?.menuId || ''}
				onChange={handleChange}
				className="mt-5 w-1/4 rounded-md bg-white"
				FormHelperTextProps={{ style: { backgroundColor: 'transparent' } }}
			>
				{menuList.map((option) => (
					<MenuItem key={option.menuId} value={option.menuId}>
						{option.menuName}
					</MenuItem>
				))}
			</TextField>
		</Box>
	);
}
