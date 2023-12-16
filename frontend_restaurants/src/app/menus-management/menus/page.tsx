'use client';

import React from 'react';
import { useState, useEffect } from 'react';

import { redirect } from 'next/navigation';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

import MenuModifier from '@/components/MenusManagement/MenuModifier';
import MenuSelector from '@/components/MenusManagement/MenuSelector';
import useRedirect from '@/hooks/useRedirect';
import { getAllMenu } from '@/lib/api/menu/api';
import type { MenuListType } from '@/lib/types';

const sampleMenuList: MenuListType = [
	{
		menuId: -1,
		menuName: '',
		menuType: '',
		menuTime: '',
		categories: [],
	},
];

export default function MenuList() {
	const { isRedirecting, redirectURL, restaurantId } = useRedirect();
	if (isRedirecting) redirect(redirectURL);

	const [menuList, setMenuList] = useState(sampleMenuList);
	const [selectedMenu, setSelectedMenu] = useState(sampleMenuList[0]);

	useEffect(() => {
		const fetchMenus = async () => {
			try {
				const menus = await getAllMenu(restaurantId);

				if (menus && menus.length > 0) {
					setMenuList(menus);
					setSelectedMenu(menus[0]);
				}
			} catch (error) {
				console.error('Error loading menus:', error);
			}
		};

		if (restaurantId !== -1) fetchMenus();
	}, [restaurantId]);
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
				{selectedMenu && selectedMenu.menuId !== -1 && (
					<Box sx={{ width: '85%', height: '30%' }}>
						<MenuModifier
							setMenuList={setMenuList}
							selectedMenu={selectedMenu}
							setSelectedMenu={setSelectedMenu}
						/>
					</Box>
				)}
			</Box>
		</>
	);
}
