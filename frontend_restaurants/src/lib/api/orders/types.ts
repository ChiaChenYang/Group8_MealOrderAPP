export type OrderItemType = {
	itemName: string;
	number: number;
	remark?: string;
};

export type OrderType = {
	orderId: number;
	type: string;
	orderTime: string;
	orderItems: OrderItemType[];
	noteFromUser?: string | null;
	totalPrice: number;
	finishTime: null | string;
	completeTime: null | string;
};

export type ProcessingOrderType = OrderType & { expectedFinishedTime: string };

export type HistoryOrderType = Omit<OrderType, 'finishTime' | 'completeTime'>;

export type GetIncomingOrders = (restaurantId: number) => Promise<OrderType[]>;

export type GetProgressingOrders = (restaurantId: number) => Promise<ProcessingOrderType[]>;

export type GetWaitingOrders = (restaurantId: number) => Promise<OrderType[]>;

export type GetCompletedOrders = (restaurantId: number) => Promise<OrderType[]>;

export type GetSingleOrder = (restaurantId: number) => Promise<OrderType>;

export type GetHistoryOrders = (restaurantId: number) => Promise<HistoryOrderType[]>;

export type AcceptOrder = (orderId: number) => Promise<void>;

export type RejectOrder = (orderId: number) => Promise<void>;

export type FinishPreparingOrder = (orderId: number) => Promise<void>;

export type CompleteOrder = (orderId: number) => Promise<void>;

export type DelayOrder = (orderId: number, delayTime: number) => Promise<void>;
