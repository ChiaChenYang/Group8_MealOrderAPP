'use client';

import { useState, useEffect } from 'react';

import { redirect } from 'next/navigation';

import { AppBar, Toolbar } from '@mui/material';
import { ThemeProvider } from '@mui/material';
import { Box } from '@mui/system';

import ItemStatistics from '@/components/MenusManagement/ItemStatistics';
import ItemsControlSelector from '@/components/MenusManagement/ItemsControlSelector';
import useRedirect from '@/hooks/useRedirect';
import { getAllMenu, getSellingItem, getPausingItem } from '@/lib/api/menu/api';
import type { ItemControlList } from '@/lib/api/menu/types';
import type { MenuListType } from '@/lib/types';
import { yellowTheme } from '@/theme/Theme';

const sampleMenuList: MenuListType = [
	{
		menuId: -1,
		menuName: '',
		menuType: '',
		menuTime: '',
		categories: [],
	},
];

export default function ItemsControl() {
	const { isRedirecting, redirectURL, restaurantId } = useRedirect();
	if (isRedirecting) redirect(redirectURL);
	const [menuList, setMenuList] = useState(sampleMenuList);
	const [selectedMenu, setSelectedMenu] = useState(sampleMenuList[0]);
	const [sellingItems, setSellingItems] = useState<ItemControlList>([]);
	const [pausingItems, setPausingItems] = useState<ItemControlList>([]);

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

		if (restaurantId != -1) fetchMenus();
	}, [restaurantId]);

	useEffect(() => {
		const fetchItems = async () => {
			try {
				if (selectedMenu && selectedMenu.menuId && selectedMenu.menuId !== -1) {
					const sellingItems = await getSellingItem(selectedMenu.menuId);
					const pausingItems = await getPausingItem(selectedMenu.menuId);
					console.log('sellingItems: ', sellingItems);
					setSellingItems(sellingItems);
					setPausingItems(pausingItems);
				}
			} catch (error) {
				console.error('Error fetching items:', error);
			}
		};

		fetchItems();
	}, [selectedMenu]);

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
				<ItemStatistics tableName="Selling" items={sellingItems} />
			</Box>

			<ThemeProvider theme={yellowTheme}>
				<Box className="m-5 flex h-4/5 w-4/5 flex-col justify-center">
					<ItemStatistics tableName="Pausing" items={pausingItems} />
				</Box>
			</ThemeProvider>
		</Box>
	);
}
