export type ManagementDrawer = {
	activePage: string;
};

export type HomeDrawer = {
	activePage: string;
};

export type openHour = {
	day: string;
	startTime: Date;
	endTime: Date;
};

export type RestaurantFormType = {
	restaurantId: number;
	restaurantName: string;
	restaurantGroup: string;
	restaurantType: string;
	telephoneNumber: string;
	factoryLocation: string;
	restaurantLocation: string;
	latestNews: string[];
	isOpening: boolean;
	openHours: openHour[];
	prepareTime: number;
};

export type RestaruantGroups = string[];
export type RestaruantTypes = string[];
export type RestaurantLocations = string[];
export type MenuListNameType = string[];

export type CategoryData = {
	categoryId: number;
	categoryName: string;
	items: ItemMenuProps[];
};

export type MenuData = {
	menuId?: number;
	menuName: string;
	menuType?: string;
	menuTime?: string;
	categories: CategoryData[];
};

export type MenuListType = MenuData[];

export type MenuSelectorProps = {
	menuList: MenuListType;
	setMenuList: React.Dispatch<React.SetStateAction<MenuListType>>;
	selectedMenu: MenuData;
	setSelectedMenu: React.Dispatch<React.SetStateAction<MenuData>>;
};

export type MenuModifierProps = {
	setMenuList: React.Dispatch<React.SetStateAction<MenuListType>>;
	selectedMenu: MenuData;
	setSelectedMenu: React.Dispatch<React.SetStateAction<MenuData>>;
};

export type ItemStatisticProps = {
	id: number;
	itemName: string;
	totalNumber: number;
	soldNumber: number;
	isSelling: boolean;
};

export type ItemMenuProps = {
	id: number;
	itemName: string;
	itemDescription: string;
	itemImage?: File;
	itemPrice: number;
	itemCalories: number;
	itemTags: string[];
};

export type SingleItemProps = {
	item: ItemMenuProps;
	setItem: (item: ItemMenuProps) => void;
};

export type orderItem = {
	itemName: string;
	number: number;
	remark: string;
};

export type orderItems = orderItem[];

type OrderType = {
	orderId: number;
	type: string;
	orderTime: Date;
	orderItems: orderItems;
	noteFromUser: string;
	totalPrice: number;
	finishTime: Date;
	completeTime: Date;
};

export type IncomingOrderType = Omit<OrderType, 'finishTime' | 'completeTime'>;
export type ProcessingOrderType = Omit<OrderType, 'finishTime' | 'completeTime'>;
export type WaitingOrderType = Omit<OrderType, 'completeTime'>;
export type CompletedOrderType = OrderType;

export type OrderList = OrderType[];
export type IncomingOrderList = IncomingOrderType[];
export type ProcessingOrderList = ProcessingOrderType[];
export type WaitingOrderList = WaitingOrderType[];
export type CompletedOrderList = CompletedOrderType[];

export type IncomingOrderCardProps = {
	order: IncomingOrderType;
};

export type ProcessingOrderCardProps = {
	order: ProcessingOrderType;
};

export type WaitingOrderCardProps = {
	order: WaitingOrderType;
};

export type CompletedOrderCardProps = {
	order: CompletedOrderType;
};
