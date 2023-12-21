import { z } from 'zod';

export const OrderItemSchema = z.object({
	itemName: z.string(),
	number: z.number(),
	remark: z.string().optional(),
});

export const OrderSchema = z.object({
	orderId: z.number(),
	type: z.string(),
	orderTime: z.string(),
	orderItems: z.array(OrderItemSchema),
	noteFromUser: z.union([z.string(), z.null()]).optional(),
	totalPrice: z.number(),
	finishTime: z.union([z.string(), z.null()]),
	completeTime: z.union([z.string(), z.null()]),
});

export const ProcessingOrderSchema = OrderSchema.extend({
	expectedFinishedTime: z.string(),
});

export const OrderSchemaList = z.array(OrderSchema);

export const ProgressingOrderSchemaList = z.array(ProcessingOrderSchema);

export const HistoryOrderSchema = OrderSchema.omit({
	finishTime: true,
}).extend({
	Rating: z.union([z.number(), z.null()]),
	Comment: z.union([z.string(), z.null()]),
});

export const HistoryOrderSchemaList = z.array(HistoryOrderSchema);
