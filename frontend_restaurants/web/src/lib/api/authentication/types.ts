export type SignupType = {
	status: number;
	user: {
		id: number;
		email: string;
	};
	token: string;
};

export type LoginType = SignupType;

export type Signup = (email: string, password: string) => Promise<SignupType>;
export type Login = (email: string, password: string) => Promise<LoginType>;
