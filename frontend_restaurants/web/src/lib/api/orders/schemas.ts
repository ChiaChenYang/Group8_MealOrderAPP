import { z } from 'zod';

export const OrderItemSchema = z.object({
	itemName: z.string(),
	number: z.number(),
	remark: z.string(),
});

export const OrderSchema = z.object({
	orderId: z.number(),
	type: z.string(),
	orderTime: z.string(),
	orderItems: z.array(OrderItemSchema),
	noteFromUser: z.string(),
	totalPrice: z.number(),
	finishTime: z.union([z.string(), z.null()]),
	completeTime: z.union([z.string(), z.null()]),
});

export const OrderSchemaList = z.array(OrderSchema);

export const HistoryOrderSchema = OrderSchema.omit({
	finishTime: true,
	completeTime: true,
});

export const HistoryOrderSchemaList = z.array(HistoryOrderSchema);
