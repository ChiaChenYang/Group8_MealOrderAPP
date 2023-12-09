import { z } from 'zod';

const ItemControlSchema = z.object({
	itemId: z.number(),
	itemName: z.string(),
	totalNumber: z.number(),
	soldNumber: z.number(),
	isSelling: z.boolean(),
});

export const ItemControlListSchema = z.array(ItemControlSchema);

const CategorySchema = z.object({
	categoryId: z.number(),
	categoryName: z.string(),
	items: z.array(ItemControlSchema),
});

// const MenuSchema = z.object({
// 	menuId: z.number(),
// 	menuName: z.string(),
// 	menuType: z.string(),
// 	menuTime: z.string(),
// 	categories: z.array(CategorySchema),
// });

export const ModifyItemSchema = z.object({
	itemId: z.number(),
	isSelling: z.boolean(),
	totalNumber: z.number(),
});

// Schema for ModifyMenu
export const ModifyMenuSchema = z.object({
	menuId: z.number(),
	menuName: z.string(),
	menuType: z.string(),
	menuTime: z.string(),
	categories: z.array(CategorySchema), // Assuming CategorySchema is already defined
});
