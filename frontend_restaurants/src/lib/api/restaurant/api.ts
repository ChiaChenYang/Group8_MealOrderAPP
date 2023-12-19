import api from '@/lib/api/base';

import { RestaurantInfoSchema, ReportSchema } from './schemas';
import type {
	GetRestaurantInfoStatus,
	GetRestaurantInfo,
	CreateRestaurantInfo,
	ModifyRestaurantInfo,
	GetYearlyReport,
	GetMonthlyReport,
	GetWeeklyReport,
	GetDailyReport,
	GetHistoryRating,
} from './types';

export const getRestaurantInfoStatus: GetRestaurantInfoStatus = async (restaurantId) => {
	try {
		const response = await api.get(`/restaurants/${restaurantId}/info/status`);
		return response.data !== 'restaurantInfo 出現錯誤';
	} catch (error) {
		console.error('Error fetching restaurant status:', error);
		return false;
	}
};

export const getRestaurantInfo: GetRestaurantInfo = async (restaurantId) => {
	try {
		const response = await api.get(`/restaurants/${restaurantId}/info`);
		const data = RestaurantInfoSchema.parse(response.data);
		const returnData = {
			...data,
			startTime: new Date(data.startTime),
			endTime: new Date(data.endTime),
		};
		return returnData;
	} catch (error) {
		console.error('Error fetching restaurant info:', error);
		throw error;
	}
};

export const createRestaurantInfo: CreateRestaurantInfo = async (restaurantInfo) => {
	try {
		const dateToStr = {
			...restaurantInfo,
			startTime: restaurantInfo.startTime.toString(),
			endTime: restaurantInfo.endTime.toString(),
		};

		const validatedData = RestaurantInfoSchema.parse(dateToStr);
		await api.post(`/restaurants/info/create`, validatedData);
	} catch (error) {
		console.error('Error creating restaurant info:', error);
		throw error;
	}
};

export const modifyRestaurantInfo: ModifyRestaurantInfo = async (restaurantInfo) => {
	try {
		const dateToStr = {
			...restaurantInfo,
			startTime: restaurantInfo.startTime.toString(),
			endTime: restaurantInfo.endTime.toString(),
		};
		const validatedData = RestaurantInfoSchema.parse(dateToStr);
		await api.put(`/restaurants/info/modify`, validatedData);
	} catch (error) {
		console.error('Error modifying restaurant info:', error);
		throw error;
	}
};

export const getYearlyReport: GetYearlyReport = async (restaurantId, year, timeOfDay) => {
	try {
		const response = await api.get(
			`/restaurants/${restaurantId}/report/yearly?year=${year}&timeOfDay=${timeOfDay}`,
		);
		return ReportSchema.parse(response.data);
	} catch (error) {
		console.error('Error getting yearly report', error);
		throw error;
	}
};

export const getMonthlyReport: GetMonthlyReport = async (restaurantId, year, month, timeOfDay) => {
	try {
		const response = await api.get(
			`/restaurants/${restaurantId}/report/monthly?year=${year}&month=${month}&timeOfDay=${timeOfDay}`,
		);
		return ReportSchema.parse(response.data);
	} catch (error) {
		console.error('Error getting monthly report', error);
		throw error;
	}
};

export const getWeeklyReport: GetWeeklyReport = async (
	restaurantId,
	year,
	month,
	day,
	timeOfDay,
) => {
	try {
		const response = await api.get(
			`/restaurants/${restaurantId}/report/weekly?year=${year}&month=${month}&day=${day}&timeOfDay=${timeOfDay}`,
		);
		return ReportSchema.parse(response.data);
	} catch (error) {
		console.error('Error getting weekly report', error);
		throw error;
	}
};

export const getDailyReport: GetDailyReport = async (restaurantId, year, month, day, timeOfDay) => {
	try {
		const response = await api.get(
			`/restaurants/${restaurantId}/report/daily?year=${year}&month=${month}&day=${day}&timeOfDay=${timeOfDay}`,
		);
		return ReportSchema.parse(response.data);
	} catch (error) {
		console.error('Error getting daily report', error);
		throw error;
	}
};

export const getHistoryRating: GetHistoryRating = async (restaurantId) => {
	try {
		const response = await api.get(`/restaurants/${restaurantId}/rating`);
		return ReportSchema.parse(response.data);
	} catch (error) {
		console.error('Error getting history rating', error);
		throw error;
	}
};
