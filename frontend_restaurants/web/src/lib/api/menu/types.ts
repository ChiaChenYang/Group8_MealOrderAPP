const sampleItem = { itemId: 1, itemName: '乾麵' };

const sampleCategory = {
	categoryId: 1,
	categoryName: '麵',
	items: [sampleItem],
};

const sampleMenu = {
	menuId: 3,
	menuName: '午間菜單',
	menuType: '預購',
	menuTime: '午段',
	categories: [sampleCategory],
};

const sampleItemControl = {
	itemId: 1,
	itemName: '乾麵',
	totalNumber: 30,
	soldNumber: 24,
	isSelling: true,
};

export type Menu = typeof sampleMenu;
export type Item = typeof sampleItem;
export type Category = typeof sampleCategory;

export type GetAllMenu = (restaurantId: number) => Menu[];

export type newMenu = (
	restaurantId: number,
	menuName: string,
	menuType: string,
	menuTime: string,
) => number;

export type ItemControl = typeof sampleItemControl;
export type ItemControlList = ItemControl[];

export type GetSellingItem = (menuId: number) => Promise<ItemControlList>;
export type GetPausingItem = (menuId: number) => Promise<ItemControlList>;

export type ModifyItem = (
	itemId: number,
	isSelling: boolean,
	totalNumber: number,
) => Promise<number>;

export type ModifyMenu = (
	menuId: number,
	menuName: string,
	menuType: string,
	menuTime: string,
	categories: Category[],
) => Promise<number>;
