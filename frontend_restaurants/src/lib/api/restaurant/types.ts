export type GetRestaurantInfoStatus = (restaurantId: number) => Promise<boolean>;

export type RestaurantInfo = {
	restaurantId: number;
	restaurantName: string;
	restaurantGroup: string;
	restaurantType: string;
	restaurantImage?: string;
	telephoneNumber: string;
	factoryArea: string;
	factoryLocation: string;
	restaurantLocation: string;
	latestNews: string[];
	isOpening: boolean;
	prepareTime: number;
	startTime: Date;
	endTime: Date;
	acceptingOrderType: string;
};

export type GetRestaurantInfo = (restaurantId: number) => Promise<RestaurantInfo>;

export type CreateRestaurantInfo = (restaurantInfo: RestaurantInfo) => Promise<void>;

export type ModifyRestaurantInfo = (restaurantInfo: RestaurantInfo) => Promise<void>;

export type GetYearlyReport = (
	restaurantId: number,
	year: number,
	timeOfDay: string,
) => Promise<number[]>;

export type GetMonthlyReport = (
	restaurantId: number,
	year: number,
	month: number,
	timeOfDay: string,
) => Promise<number[]>;

export type GetWeeklyReport = (
	restaurantId: number,
	year: number,
	month: number,
	day: number,
	timeOfDay: string,
) => Promise<number[]>;

export type GetDailyReport = (
	restaurantId: number,
	year: number,
	month: number,
	day: number,
	timeOfDay: string,
) => Promise<number[]>;

export type GetHistoryRating = (restaurantId: number) => Promise<number[]>;
