import { z } from 'zod';

export const UserSchema = z.object({
	id: z.number(),
	email: z.string(),
});

export const AuthResponseSchema = z.object({
	status: z.number(),
	user: UserSchema,
	token: z.string(),
});
