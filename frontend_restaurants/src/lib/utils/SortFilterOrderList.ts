import type {
	IncomingOrderList,
	ProcessingOrderType,
	ProcessingOrderList,
	WaitingOrderList,
	CompletedOrderList,
	WaitingOrderType,
	CompletedOrderType,
	HistoryOrderList,
	HistoryOrderType,
} from '../types';

type AllOrderList =
	| IncomingOrderList
	| ProcessingOrderList
	| WaitingOrderList
	| CompletedOrderList
	| HistoryOrderList;

function getFinishTime(order: WaitingOrderType | CompletedOrderType) {
	return order.finishTime;
}
function getRating(order: HistoryOrderType) {
	return order.rating;
}

export default function SortFilterOrderList(
	originalList: AllOrderList,
	sortBy: string,
	filter: string,
) {
	originalList.sort((orderA, orderB) => {
		if (sortBy == 'orderTime') {
			const timeA = orderA.orderTime.getTime();
			const timeB = orderB.orderTime.getTime();
			if (timeA == timeB) {
				return orderA.orderId - orderB.orderId;
			} else {
				return timeA - timeB;
			}
		} else if (sortBy == 'totalPrice') {
			const priceA = orderA.totalPrice;
			const priceB = orderB.totalPrice;
			if (priceA == priceB) {
				return orderA.orderId - orderB.orderId;
			} else {
				return -(priceA - priceB);
			}
		} else if (sortBy == 'finishTime') {
			const finishTimeA = getFinishTime(orderA as WaitingOrderType).getTime();
			const finishTimeB = getFinishTime(orderB as WaitingOrderType).getTime();
			if (finishTimeA == finishTimeB) {
				return orderA.orderId - orderB.orderId;
			} else {
				return finishTimeA - finishTimeB;
			}
		} else if (sortBy == 'ratingHigh') {
			const ratingA = getRating(orderA as HistoryOrderType) || 0;
			const ratingB = getRating(orderB as HistoryOrderType) || 0;
			if (ratingA == ratingB) {
				return orderA.orderId - orderB.orderId;
			} else {
				return -(ratingA - ratingB);
			}
		} else if (sortBy == 'ratingLow') {
			const ratingA = getRating(orderA as HistoryOrderType) || 0;
			const ratingB = getRating(orderB as HistoryOrderType) || 0;
			if (ratingA == ratingB) {
				return orderA.orderId - orderB.orderId;
			} else {
				return ratingA - ratingB;
			}
		} else if (sortBy == 'expectedFinishedTime') {
			const processingA = orderA as ProcessingOrderType;
			const processingB = orderB as ProcessingOrderType;
			const timeA = new Date(processingA.expectedFinishedTime).getTime();
			const timeB = new Date(processingB.expectedFinishedTime).getTime();
			if (timeA == timeB) {
				return orderA.orderId - orderB.orderId;
			} else {
				return timeA - timeB;
			}
		} else {
			alert('Sorting Error!');
			return 0;
		}
	});

	const filteredOrders = originalList.filter((order) =>
		order.orderId.toString().includes(filter),
	);
	return filteredOrders;
}
