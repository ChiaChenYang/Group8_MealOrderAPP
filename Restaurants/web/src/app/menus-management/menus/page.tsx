'use client';

import React from 'react';
import { useState } from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

import MenuModifier from '@/components/MenusManagement/MenuModifier';
import MenuSelector from '@/components/MenusManagement/MenuSelector';
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
				],
			},
		],
	},
];

export default function MenuList() {
	const [menuList, setMenuList] = useState(sampleMenuList);
	const [selectedMenu, setSelectedMenu] = useState(sampleMenuList[0]);
	return (
		<>
			<AppBar color="primary" sx={{ height: '130px' }}>
				<Toolbar>
					<MenuSelector
						menuList={menuList}
						setMenuList={setMenuList}
						selectedMenu={selectedMenu}
						setSelectedMenu={setSelectedMenu}
					/>
				</Toolbar>
			</AppBar>

			<Box className="mt-[160px] flex flex-1 flex-col items-center">
				<Box sx={{ width: '85%', height: '30%' }}>
					<MenuModifier
						setMenuList={setMenuList}
						selectedMenu={selectedMenu}
						setSelectedMenu={setSelectedMenu}
					/>
				</Box>
			</Box>
		</>
	);
}
