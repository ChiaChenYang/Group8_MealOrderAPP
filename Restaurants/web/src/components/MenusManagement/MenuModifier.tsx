import React, { useState } from 'react';

import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Button, TextField, Box } from '@mui/material';
import {
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Typography,
	IconButton,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

import SingleItem from '@/components/MenusManagement/SingleItem';
import type { ItemMenuProps, MenuModifierProps } from '@/lib/types';

export default function MenuModifier({ setMenuList, selectedMenu }: MenuModifierProps) {
	const [menuData, setMenuData] = useState(selectedMenu);
	const theme = useTheme();
	const [expanded, setExpanded] = useState<string | false>(false);

	const handleAccordionChange =
		(panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
			setExpanded(isExpanded ? panel : false);
		};

	const handleDeleteCategory = (categoryId: number) => {
		const updatedCategories = menuData.categories?.filter(
			(category) => category.categoryId !== categoryId,
		);
		setMenuData({ ...menuData, categories: updatedCategories });
	};

	const handleDeleteItem = (categoryId: number, id: number) => {
		const updatedCategories = menuData.categories?.map((category) => {
			if (category.categoryId === categoryId) {
				return {
					...category,
					items: category.items.filter((item) => item.id !== id),
				};
			}
			return category;
		});
		setMenuData({ ...menuData, categories: updatedCategories });
	};

	const handleModifyItem = (categoryId: number, id: number, newItem: ItemMenuProps) => {
		const updatedCategories = menuData.categories?.map((category) => {
			if (category.categoryId === categoryId) {
				return {
					...category,
					items: category.items.map((item) => (item.id === id ? newItem : item)),
				};
			}
			return category;
		});
		setMenuData({ ...menuData, categories: updatedCategories });
	};

	const handleFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setMenuData({ ...menuData, [name]: value });
	};

	const handleSave = () => {
		if (!menuData.menuName) {
			alert('菜單名稱不能為空');
			return;
		}

		setMenuList((prevMenuList) =>
			prevMenuList.map((menu) => (menu.menuId === menuData.menuId ? menuData : menu)),
		);
	};

	const menuTypes = ['預購', '非預購'];
	const menuTimes = ['午段', '晚段', '全日'];

	return (
		<Box>
			<Box className="flex justify-start">
				<Box className="flex flex-row" sx={{ mr: 5, ml: 5, mt: 1.5 }}>
					<TextField
						id="menu-name"
						name="menuName"
						label="菜單名稱"
						type="text"
						variant="standard"
						value={menuData.menuName || ''}
						onChange={handleFieldChange}
					/>
				</Box>

				<Box sx={{ mr: 5 }}>
					<Box
						component="span"
						sx={{ fontSize: 'small', color: theme.palette.text.secondary }}
					>
						菜單類別
					</Box>
					<Box sx={{ display: 'flex', gap: 1 }}>
						{menuTypes.map((type) => (
							<Button
								key={type}
								variant="contained"
								onClick={() => setMenuData({ ...menuData, menuType: type })}
								sx={{
									borderRadius: 5,
									borderColor:
										menuData.menuType === type
											? `${theme.palette.primary.main} !important`
											: '#C4C4C4 !important',
									bgcolor:
										menuData.menuType === type
											? `${theme.palette.primary.main} !important`
											: '#C4C4C4 !important',
									color: 'black',
								}}
							>
								{type}
							</Button>
						))}
					</Box>
				</Box>

				<Box>
					<Box
						component="span"
						sx={{ fontSize: 'small', color: theme.palette.text.secondary }}
					>
						菜單時段
					</Box>

					<Box sx={{ display: 'flex', gap: 1 }}>
						{menuTimes.map((time) => (
							<Button
								key={time}
								variant="contained"
								onClick={() => setMenuData({ ...menuData, menuTime: time })}
								sx={{
									borderRadius: 5,
									borderColor:
										menuData.menuTime === time
											? `${theme.palette.primary.main} !important`
											: '#C4C4C4 !important',
									bgcolor:
										menuData.menuTime === time
											? `${theme.palette.primary.main} !important`
											: '#C4C4C4 !important',
									color: 'black',
								}}
							>
								{time}
							</Button>
						))}
					</Box>
				</Box>
			</Box>

			<Box className="mt-10 flex flex-col items-center">
				{menuData.categories?.map((category) => (
					<Accordion
						expanded={expanded === `panel${category.categoryId}`}
						onChange={handleAccordionChange(`panel${category.categoryId}`)}
						key={category.categoryId}
						sx={{ marginBottom: '10px', width: '90%' }}
					>
						<AccordionSummary
							expandIcon={<ExpandMoreIcon />}
							aria-controls={`panel${category.categoryId}-content`}
							id={`panel${category.categoryId}-header`}
						>
							<Box
								sx={{
									display: 'flex',
									justifyContent: 'space-between',
									width: '100%',
									alignItems: 'center',
								}}
							>
								<Typography sx={{ flexShrink: 0 }}>
									{category.categoryName}
								</Typography>
								<Box sx={{ display: 'flex', alignItems: 'center' }}>
									<Typography
										sx={{ color: 'text.secondary', marginRight: '16px' }}
									>
										{category.items.length} items
									</Typography>
									<IconButton
										edge="end"
										aria-label="delete"
										onClick={() => handleDeleteCategory(category.categoryId)}
									>
										<DeleteIcon />
									</IconButton>
								</Box>
							</Box>
						</AccordionSummary>
						<AccordionDetails>
							{category.items.map((item) => (
								<Accordion key={item.id}>
									<AccordionSummary expandIcon={<ExpandMoreIcon />}>
										<Box
											sx={{
												display: 'flex',
												justifyContent: 'space-between',
												width: '100%',
												alignItems: 'center',
											}}
										>
											<Typography sx={{ flexShrink: 0 }}>
												{item.itemName}
											</Typography>
											<IconButton
												edge="end"
												aria-label="delete"
												onClick={() =>
													handleDeleteItem(category.categoryId, item.id)
												}
											>
												<DeleteIcon />
											</IconButton>
										</Box>
									</AccordionSummary>
									<AccordionDetails>
										<SingleItem
											item={item}
											setItem={(newItem) =>
												handleModifyItem(
													category.categoryId,
													item.id,
													newItem,
												)
											}
										/>
									</AccordionDetails>
								</Accordion>
							))}
						</AccordionDetails>
					</Accordion>
				))}
			</Box>

			<Box sx={{ position: 'fixed', bottom: 16, right: 16 }}>
				<Button
					color="primary"
					onClick={handleSave}
					variant="contained"
					sx={{
						borderColor: `${theme.palette.primary.main} !important`,
						bgcolor: `${theme.palette.primary.main} !important`,
						color: 'black',
						borderRadius: 5,
					}}
				>
					儲存
				</Button>
			</Box>
		</Box>
	);
}
