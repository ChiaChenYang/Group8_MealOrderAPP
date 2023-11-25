import type {
	IncomingOrderList,
	ProcessingOrderList,
	WaitingOrderList,
	CompletedOrderList,
	WaitingOrderType,
	CompletedOrderType,
} from './types';

type AllOrderList = IncomingOrderList | ProcessingOrderList | WaitingOrderList | CompletedOrderList;

function getFinishTime(order: WaitingOrderType | CompletedOrderType) {
	return order.finishTime;
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
