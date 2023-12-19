import api from '@/lib/api/base';

import {
	ItemControlListSchema,
	ModifyItemSchema,
	ModifyMenuSchema,
	MenuListSchema,
} from './schemas';
import type {
	GetSellingItem,
	GetPausingItem,
	ModifyItem,
	ModifyMenu,
	GetAllMenu,
	newMenu,
	BackendMenu,
} from './types';

export const getSellingItem: GetSellingItem = async (menuId) => {
	try {
		const response = await api.get(`menus/sellingitems/${menuId}`);
		if (Array.isArray(response.data.data)) {
			return ItemControlListSchema.parse(response.data.data);
		} else {
			return [];
		}
	} catch (error) {
		console.error('Error fetching selling items:', error);
		throw error;
	}
};

export const getPausingItem: GetPausingItem = async (menuId) => {
	try {
		const response = await api.get(`menus/pausingitems/${menuId}`);
		if (Array.isArray(response.data.data)) {
			return ItemControlListSchema.parse(response.data.data);
		} else {
			return [];
		}
	} catch (error) {
		console.error('Error fetching pausing items:', error);
		throw error;
	}
};

export const modifyItem: ModifyItem = async (itemId, isSelling, totalNumber) => {
	try {
		// Validate the data before sending it to the API
		const validatedData = ModifyItemSchema.parse({ itemId, isSelling, totalNumber });
		const response = await api.put(`/menus/items`, validatedData);
		return response.status; // Assuming the API returns a status code on successful update
	} catch (error) {
		console.error('Error modifying item:', error);
		throw error;
	}
};

export const getAllMenu: GetAllMenu = async (restaurantId) => {
	try {
		const response = await api.get(`menus/allmenudetails/${restaurantId}`);
		const rawData: BackendMenu[] = response.data.data.menus;

		const processedData = rawData.map((menu) => ({
			...menu,
			categories: menu.categories.map((category) => ({
				...category,
				items: category.items?.map((item) => ({
					...item,
					itemDescription: item.descriptionText,
					itemPrice: item.price,
					itemCalories: item.calories,
					itemTags: item.tags?.map((tag) => tag.tagName),
				})),
			})),
		}));
		const menuList = MenuListSchema.parse(processedData);
		return menuList;
	} catch (error) {
		console.error('Error getting menu:', error);
		throw error;
	}
};

export const createNewMenu: newMenu = async (restaurantId, menuName, menuType, menuTime) => {
	try {
		const response = await api.post('http://localhost:3000/menus/newmenu', {
			restaurantId,
			menuName,
			menuType,
			menuTime,
		});

		const newMenuId = response.data.data.menuId;
		return newMenuId;
	} catch (error) {
		console.error('Error creating menu:', error);
		throw error;
	}
};

export const modifyMenu: ModifyMenu = async (menuId, menuName, menuType, menuTime, categories) => {
	try {
		const validatedData = ModifyMenuSchema.parse({
			menuId,
			menuName,
			menuType,
			menuTime,
			categories,
		});

		const postingData = {
			menuId,
			menuName,
			menuType,
			menuTime,
			categories: validatedData.categories.map((category) => ({
				...category,
				items: category.items.map((item) => ({
					...item,
					descriptionText: item.itemDescription,
					price: item.itemPrice,
					calories: item.itemCalories,
					Tags: item.itemTags.map((tag) => ({
						tagId: 10 ** 12,
						tagName: tag,
					})),
				})),
			})),
		};

		const response = await api.post(`/menus/menudetails`, postingData);
		return response.status; // Assuming the API returns a status code on successful update
	} catch (error) {
		console.error('Error modifying menu:', error);
		throw error;
	}
};
