import type { SignInRequest, SignInResponse, SignUpRequest } from '../types';

import { env } from '@/lib/utils/env';

export const signInApi = async ({ email, password }: SignInRequest) => {
	const response = await fetch(`${env.NEXT_PUBLIC_BACKEND_URL}/signin`, {
		headers: {
			'content-type': 'application/json;charset=UTF-8',
		},
		method: 'POST',
		body: JSON.stringify({ email, password }),
	});
	if (!response.ok) {
		const data = await response.json();
		throw new Error(data.error);
	}
	const data: SignInResponse = await response.json();
	return data;
};
export const signUpApi = async ({ email, password }: SignUpRequest) => {
	const response = await fetch(`${env.NEXT_PUBLIC_BACKEND_URL}/signup`, {
		headers: {
			'content-type': 'application/json;charset=UTF-8',
		},
		method: 'POST',
		body: JSON.stringify({ email, password }),
	});
	if (!response.ok) {
		const data = await response.json();
		throw new Error(data.error);
	}
	const data: SignInResponse = await response.json();
	return data;
};
