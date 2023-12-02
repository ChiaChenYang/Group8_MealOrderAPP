'use client';

import React from 'react';
import { useState } from 'react';

import { TextField, MenuItem } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

import OverviewItemList from '@/components/MenusManagement/OverviewItemList';
import OverviewSelector from '@/components/MenusManagement/OverviewSelector';
import type { MenuListType } from '@/lib/types';

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
						id: 31,
						itemName: '排骨飯',
						itemDescription: '香又好吃',
						itemPrice: 100,
						itemCalories: 100,
						itemTags: ['飯', '豬肉'],
					},
					{
						id: 32,
						itemName: '雞腿飯',
						itemDescription: '好吃',
						itemPrice: 120,
						itemCalories: 990,
						itemTags: ['飯', '雞腿'],
					},
					{
						id: 33,
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

export default function MenuList() {
	const menuList = sampleMenuList;
	const [selectedMenu, setSelectedMenu] = useState(sampleMenuList[0]);
	const [selectedCategory, setSelectedCategory] = useState('全部類別');
	const allCategories = selectedMenu.categories;
	return (
		<>
			<AppBar color="primary" sx={{ height: '130px' }}>
				<Toolbar>
					<OverviewSelector
						menuList={menuList}
						selectedMenu={selectedMenu}
						setSelectedMenu={setSelectedMenu}
					/>
				</Toolbar>
			</AppBar>

			<Box className="mt-[160px] flex h-4/5 w-full flex-1 flex-col items-center">
				<Box className="flex h-full w-[90%] flex-col overflow-auto">
					<TextField
						className="mb-10 w-1/5"
						label="選擇餐點類別"
						id="itemType"
						name="itemType"
						select
						value={selectedCategory}
						onChange={(e) => setSelectedCategory(e.target.value)}
						variant="standard"
					>
						<MenuItem key="all" value="全部類別">
							全部類別
						</MenuItem>
						{allCategories.map((category) => (
							<MenuItem key={category.categoryId} value={category.categoryName}>
								{category.categoryName}
							</MenuItem>
						))}
					</TextField>

					<OverviewItemList menu={selectedMenu} category={selectedCategory} />
				</Box>
			</Box>
		</>
	);
}
