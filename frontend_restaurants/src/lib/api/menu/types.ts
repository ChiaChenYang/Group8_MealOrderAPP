const sampleItem = {
	itemId: 1,
	itemName: '乾麵',
	itemDescription: '香又好吃',
	itemPrice: 100,
	itemCalories: 700,
	itemTags: ['飯', '豬肉'],
};

const sampleBackendItem = {
	itemId: 1,
	itemName: '乾麵',
	descriptionText: '香又好吃',
	price: 100,
	calories: 700,
	tags: [
		{
			tagId: 1,
			tagName: '飯',
		},
	],
};

const sampleCategory = {
	categoryId: 1,
	categoryName: '麵',
	items: [sampleItem],
};

const sampleBackendCategory = {
	...sampleCategory,
	items: [sampleBackendItem],
};

const sampleMenu = {
	menuId: 3,
	menuName: '午間菜單',
	menuType: '預購',
	menuTime: '午段',
	categories: [sampleCategory],
};

const sampleBackendMenu = {
	...sampleMenu,
	categories: [sampleBackendCategory],
};

const sampleItemControl = {
	itemId: 1,
	itemName: '乾麵',
	totalNumber: 30,
	soldNumber: 24,
	isSelling: true,
};

export type Item = typeof sampleItem;
export type Category = typeof sampleCategory;

export type Menu = typeof sampleMenu;
export type BackendMenu = typeof sampleBackendMenu;
export type GetAllMenu = (restaurantId: number) => Promise<Menu[]>;

export type newMenu = (
	restaurantId: number,
	menuName: string,
	menuType: string,
	menuTime: string,
) => Promise<number>;

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
