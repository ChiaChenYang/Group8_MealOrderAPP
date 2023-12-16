'use client';

import React, { useEffect } from 'react';
import { useState } from 'react';

import { redirect } from 'next/navigation';

import { TextField, MenuItem } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

import OverviewItemList from '@/components/MenusManagement/OverviewItemList';
import OverviewSelector from '@/components/MenusManagement/OverviewSelector';
import useRedirect from '@/hooks/useRedirect';
import { getAllMenu } from '@/lib/api/menu/api';
import type { MenuData, MenuListType } from '@/lib/types';

export default function MenuList() {
	const { isRedirecting, redirectURL } = useRedirect();
	if (isRedirecting) redirect(redirectURL);

	const [menuList, setMenuList] = useState<MenuListType>([]);
	const [selectedMenu, setSelectedMenu] = useState<MenuData>({ menuName: '', categories: [] });

	useEffect(() => {
		const getMenu = async () => {
			const menuList = await getAllMenu(1);
			setMenuList(menuList);
			if (menuList.length > 0) {
				setSelectedMenu(menuList[0]);
			}
		};
		getMenu();
	}, []);

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
