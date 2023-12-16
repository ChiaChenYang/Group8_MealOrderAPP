import { z } from 'zod';

const ItemControlSchema = z.object({
	itemId: z.number(),
	itemName: z.string(),
	totalNumber: z.number(),
	soldNumber: z.number(),
	isSelling: z.boolean(),
});

export const ItemControlListSchema = z.array(ItemControlSchema);

const ItemSchema = z.object({
	itemId: z.number(),
	itemName: z.string(),
	itemDescription: z.string(),
	itemPrice: z.number(),
	itemCalories: z.number(),
	itemTags: z.array(z.string()),
	itemImage: z.string().optional(),
});

const CategorySchema = z.object({
	categoryId: z.number(),
	categoryName: z.string(),
	items: z.array(ItemSchema),
});

const MenuSchema = z.object({
	menuId: z.number(),
	menuName: z.string(),
	menuType: z.string(),
	menuTime: z.string(),
	categories: z.array(CategorySchema),
});

export const MenuListSchema = z.array(MenuSchema);
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

export const NewMenuSchema = z.object({
	restaurantId: z.number(),
	menuName: z.string(),
	menuType: z.string(),
	menuTime: z.string(),
});
