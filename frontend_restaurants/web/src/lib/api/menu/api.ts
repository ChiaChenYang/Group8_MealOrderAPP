import api from '@/lib/api/base';

import { ItemControlListSchema, ModifyItemSchema, ModifyMenuSchema } from './schemas';
import type { GetSellingItem, GetPausingItem, ModifyItem, ModifyMenu } from './types';

export const getSellingItem: GetSellingItem = async (menuId) => {
	try {
		const response = await api.get(`menus/sellingitems/${menuId}`);
		return ItemControlListSchema.parse(response.data);
	} catch (error) {
		console.error('Error fetching selling items:', error);
		throw error;
	}
};

export const getPausingItem: GetPausingItem = async (menuId) => {
	try {
		const response = await api.get(`menus/pausingitems/${menuId}`);
		return ItemControlListSchema.parse(response.data);
	} catch (error) {
		console.error('Error fetching pausing items:', error);
		throw error;
	}
};

export const modifyItem: ModifyItem = async (itemId, isSelling, totalNumber) => {
	try {
		// Validate the data before sending it to the API
		const validatedData = ModifyItemSchema.parse({ itemId, isSelling, totalNumber });

		const response = await api.put(`/items/${itemId}`, validatedData);
		return response.status; // Assuming the API returns a status code on successful update
	} catch (error) {
		console.error('Error modifying item:', error);
		throw error;
	}
};

export const modifyMenu: ModifyMenu = async (menuId, menuName, menuType, menuTime, categories) => {
	try {
		// Validate the data before sending it to the API
		const validatedData = ModifyMenuSchema.parse({
			menuId,
			menuName,
			menuType,
			menuTime,
			categories,
		});

		const response = await api.put(`/menus/${menuId}`, validatedData);
		return response.status; // Assuming the API returns a status code on successful update
	} catch (error) {
		console.error('Error modifying menu:', error);
		throw error;
	}
};
