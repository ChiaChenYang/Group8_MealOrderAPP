'use client';

import { useState } from 'react';

import { AppBar, Toolbar } from '@mui/material';
import { ThemeProvider } from '@mui/material';
import { Box } from '@mui/system';

import ItemStatistics from '@/components/MenusManagement/ItemStatistics';
import ItemsControlSelector from '@/components/MenusManagement/ItemsControlSelector';
import type { MenuListType } from '@/lib/types';
import { yellowTheme } from '@/theme/Theme';

const sampleMenuList: MenuListType = [
	{
		menuId: 3,
		menuName: '午間菜單',
		menuType: '預購',
		menuTime: '午間',
		categories: [
			{
				categoryId: 1,
				categoryName: '麵',
				items: [
					{
						id: 10,
						itemName: '排骨麵',
						itemDescription: '香又好吃',
						itemPrice: 100,
						itemCalories: 700,
						itemTags: ['麵', '豬肉'],
					},
					{
						id: 7,
						itemName: '雞腿麵',
						itemDescription: '營養好吃',
						itemPrice: 120,
						itemCalories: 555,
						itemTags: ['麵', '雞肉'],
					},
				],
			},
			{
				categoryId: 2,
				categoryName: '飯',
				items: [
					{
						id: 16,
						itemName: '排骨飯',
						itemDescription: '香又好吃',
						itemPrice: 100,
						itemCalories: 700,
						itemTags: ['飯', '豬肉'],
					},
					{
						id: 18,
						itemName: '雞腿飯',
						itemDescription: '好吃',
						itemPrice: 120,
						itemCalories: 990,
						itemTags: ['飯', '雞腿'],
					},
					{
						id: 16,
						itemName: '排骨飯',
						itemDescription: '香又好吃',
						itemPrice: 100,
						itemCalories: 100,
						itemTags: ['飯', '豬肉'],
					},
					{
						id: 18,
						itemName: '雞腿飯',
						itemDescription: '好吃',
						itemPrice: 120,
						itemCalories: 990,
						itemTags: ['飯', '雞腿'],
					},
					{
						id: 19,
						itemName: '雞腿飯',
						itemDescription: '好吃',
						itemPrice: 120,
						itemCalories: 990,
						itemTags: ['飯', '雞腿'],
					},
				],
			},
		],
	},
];

export default function ItemsControl() {
	const menuList = sampleMenuList;
	const [selectedMenu, setSelectedMenu] = useState(sampleMenuList[0]);
	return (
		<Box className="flex w-full flex-col items-center overflow-scroll bg-white">
			<Box className="h-[15%] w-full">
				<AppBar position="static" color="primary" sx={{ width: '100%', height: '15vh' }}>
					<Toolbar>
						<ItemsControlSelector
							menuList={menuList}
							selectedMenu={selectedMenu}
							setSelectedMenu={setSelectedMenu}
						/>
					</Toolbar>
				</AppBar>
			</Box>

			<Box className="m-5 flex h-4/5 w-4/5 flex-col justify-center">
				<ItemStatistics tableName="Selling" />
			</Box>

			<ThemeProvider theme={yellowTheme}>
				<Box className="m-5 flex h-4/5 w-4/5 flex-col justify-center">
					<ItemStatistics tableName="Pausing" />
				</Box>
			</ThemeProvider>
		</Box>
	);
}
