import api from '@/lib/api/base';

import {
	OrderSchema,
	OrderSchemaList,
	ProgressingOrderSchemaList,
	HistoryOrderSchemaList,
} from './schemas';
import type {
	GetIncomingOrders,
	GetProgressingOrders,
	GetWaitingOrders,
	GetCompletedOrders,
	GetHistoryOrders,
	GetSingleOrder,
	AcceptOrder,
	RejectOrder,
	FinishPreparingOrder,
	CompleteOrder,
	DelayOrder,
} from './types';

export const getIncomingOrders: GetIncomingOrders = async (restaurantId) => {
	try {
		const response = await api.get(`/orders/${restaurantId}/incoming`);
		return OrderSchemaList.parse(response.data);
	} catch (error) {
		console.error('Error fetching incoming orders:', error);
		throw error;
	}
};

export const getProgressingOrders: GetProgressingOrders = async (restaurantId) => {
	try {
		const response = await api.get(`/orders/${restaurantId}/progressing`);
		return ProgressingOrderSchemaList.parse(response.data);
	} catch (error) {
		console.error('Error fetching progressing orders:', error);
		throw error;
	}
};

export const getWaitingOrders: GetWaitingOrders = async (restaurantId) => {
	try {
		const response = await api.get(`/orders/${restaurantId}/waiting`);
		return OrderSchemaList.parse(response.data);
	} catch (error) {
		console.error('Error fetching waiting orders:', error);
		throw error;
	}
};

export const getCompletedOrders: GetCompletedOrders = async (restaurantId) => {
	try {
		const response = await api.get(`/orders/${restaurantId}/completed`);
		return OrderSchemaList.parse(response.data);
	} catch (error) {
		console.error('Error fetching completed orders:', error);
		throw error;
	}
};

export const getHistoryOrders: GetHistoryOrders = async (restaurantId) => {
	try {
		const response = await api.get(`/orders/${restaurantId}/get/history`);
		const parsedData = HistoryOrderSchemaList.parse(response.data);
		const orders = parsedData.map((order) => ({
			...order,
			comment: order.Comment,
			rating: order.Rating,
		}));
		return orders;
	} catch (error) {
		console.error('Error fetching history orders:', error);
		throw error;
	}
};

export const acceptOrder: AcceptOrder = async (orderId) => {
	try {
		await api.put(`/orders/${orderId}/accept`);
	} catch (error) {
		console.error('Error accepting order:', error);
		throw error;
	}
};

export const rejectOrder: RejectOrder = async (orderId) => {
	try {
		await api.put(`/orders/${orderId}/reject`);
	} catch (error) {
		console.error('Error rejecting order:', error);
		throw error;
	}
};

export const finishPreparingOrder: FinishPreparingOrder = async (orderId) => {
	try {
		await api.put(`/orders/${orderId}/finish/prepare`);
	} catch (error) {
		console.error('Error finishing preparing order:', error);
		throw error;
	}
};

export const completeOrder: CompleteOrder = async (orderId) => {
	try {
		await api.put(`/orders/${orderId}/complete`);
	} catch (error) {
		console.error('Error completing order:', error);
		throw error;
	}
};

export const delayOrder: DelayOrder = async (orderId, delayTime) => {
	try {
		await api.put(`/orders/delay`, { orderId, delayTime });
	} catch (error) {
		console.error('Error delaying order:', error);
		throw error;
	}
};

export const getSingleOrder: GetSingleOrder = async (orderId) => {
	try {
		const response = await api.get(`/orders/${orderId}/get/single`);
		return OrderSchema.parse(response.data);
	} catch (error) {
		console.error('Error fetching completed orders:', error);
		throw error;
	}
};
