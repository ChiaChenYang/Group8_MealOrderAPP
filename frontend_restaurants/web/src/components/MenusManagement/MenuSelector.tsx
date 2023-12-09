'use client';

import React, { useState } from 'react';

import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	MenuItem,
	TextField,
	RadioGroup,
	FormControlLabel,
	Radio,
	FormControl,
	FormLabel,
} from '@mui/material';

import type { MenuData, MenuSelectorProps } from '@/lib/types';

export default function MenuSelector({
	menuList,
	setMenuList,
	selectedMenu,
	setSelectedMenu,
}: MenuSelectorProps) {
	const [dialogOpen, setDialogOpen] = useState(false);
	const [newMenu, setNewMenu] = useState<Partial<MenuData>>({});
	const [error, setError] = useState<string | null>(null);

	const handleOpenDialog = () => {
		setDialogOpen(true);
	};

	const handleCloseDialog = () => {
		setDialogOpen(false);
		setNewMenu({});
		setError(null);
	};

	const handleSaveMenuItem = () => {
		const { menuName, menuType, menuTime } = newMenu;

		if (!menuName || !menuType || !menuTime) {
			setError('All fields are required.');
			return;
		}

		if (menuList.some((menu) => menu.menuName.toLowerCase() === menuName.toLowerCase())) {
			setError('Menu name must be unique.');
			return;
		}

		const newMenuWithId: MenuData = {
			menuId: Math.max(0, ...menuList.map((m) => m.menuId || 0)) + 1,
			menuName,
			menuType,
			menuTime,
			categories: [],
		};

		setMenuList([...menuList, newMenuWithId]);
		setSelectedMenu(newMenuWithId);
		handleCloseDialog();
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const menuValue = event.target.value;
		if (menuValue === 'add-new') {
			handleOpenDialog();
		} else {
			const selectedMenu = menuList.find((menu) => menu.menuId === Number(menuValue));
			if (selectedMenu) {
				setSelectedMenu(selectedMenu);
			}
		}
	};

	const handleFieldChange =
		(field: keyof MenuData) => (event: React.ChangeEvent<HTMLInputElement>) => {
			setNewMenu((prev) => ({ ...prev, [field]: event.target.value }));
		};

	return (
		<Box className="mt-5 flex w-full pl-[280px]">
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
				<MenuItem key="add-new" value="add-new">
					新增菜單
				</MenuItem>
			</TextField>

			<Dialog open={dialogOpen} onClose={handleCloseDialog}>
				<DialogTitle sx={{ textAlign: 'center' }}>新增菜單</DialogTitle>
				<DialogContent>
					<TextField
						autoFocus
						margin="dense"
						id="menu-name"
						label="菜單名稱"
						type="text"
						fullWidth
						variant="standard"
						onChange={handleFieldChange('menuName')}
						error={!!error}
						helperText={error}
					/>
				</DialogContent>
				<DialogContent>
					<FormControl component="fieldset" sx={{ mt: 1 }}>
						<FormLabel component="legend">菜單類型：</FormLabel>
						<RadioGroup
							sx={{ mt: 1 }}
							aria-label="menu-type"
							name="menu-type"
							value={newMenu.menuType || ''}
							onChange={handleFieldChange('menuType')}
							row
						>
							<FormControlLabel value="預購" control={<Radio />} label="預購" />
							<FormControlLabel value="非預購" control={<Radio />} label="非預購" />
						</RadioGroup>
					</FormControl>
				</DialogContent>
				<DialogContent>
					<FormControl component="fieldset" sx={{ mt: 1 }}>
						<FormLabel component="legend">菜單時段：</FormLabel>
						<RadioGroup
							sx={{ mt: 1 }}
							aria-label="menu-time"
							name="menu-time"
							value={newMenu.menuTime || ''}
							onChange={handleFieldChange('menuTime')}
							row
						>
							<FormControlLabel value="午間" control={<Radio />} label="午段" />
							<FormControlLabel value="晚間" control={<Radio />} label="晚段" />
							<FormControlLabel value="全日" control={<Radio />} label="全日" />
						</RadioGroup>
					</FormControl>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCloseDialog}>取消</Button>
					<Button onClick={handleSaveMenuItem}>儲存</Button>
				</DialogActions>
			</Dialog>
		</Box>
	);
}
