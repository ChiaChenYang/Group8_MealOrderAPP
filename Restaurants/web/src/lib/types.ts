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
