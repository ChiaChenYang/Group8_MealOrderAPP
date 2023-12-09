import api from '@/lib/api/base';

import { AuthResponseSchema } from './schemas';
import type { Signup, Login } from './types';

export const signup: Signup = async (email, password) => {
	const postData = { email, password };
	try {
		const response = await api.post('/users/merchant/signup', postData);
		const result = AuthResponseSchema.parse(response.data);
		return result;
	} catch (error) {
		console.error('Signup failed:', error);
		throw error;
	}
};

export const login: Login = async (email, password) => {
	const postData = { email, password };
	try {
		const response = await api.post('/users/merchant/login', postData);
		const result = AuthResponseSchema.parse(response.data);
		return result;
	} catch (error) {
		console.error('Login failed:', error);
		throw error;
	}
};
