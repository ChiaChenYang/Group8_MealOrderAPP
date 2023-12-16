import { z } from 'zod';

export const RestaurantInfoSchema = z.object({
	restaurantId: z.number(),
	restaurantName: z.string(),
	restaurantGroup: z.string(),
	restaurantType: z.string(),
	restaurantImage: z.string().optional(),
	telephoneNumber: z.string(),
	factoryArea: z.string(),
	factoryLocation: z.string(),
	restaurantLocation: z.string(),
	latestNews: z.array(z.string()),
	isOpening: z.boolean(),
	prepareTime: z.number(),
	startTime: z.string(),
	endTime: z.string(),
	acceptingOrderType: z.string(),
});

export const ReportSchema = z.array(z.number());
