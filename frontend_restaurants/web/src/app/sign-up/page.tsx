'use client';

import React, { useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { TextField, Button, Card, CardContent, Snackbar, Alert } from '@mui/material';
import type { AlertColor } from '@mui/material';
import Box from '@mui/material/Box';

import { signUpApi } from '@/lib/utils/api';

function Page() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState('');
	const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor>('info');
	const router = useRouter();
	const commonTextClass = 'text-base';

	const showSnackbar = (message: string, severity: AlertColor) => {
		setSnackbarMessage(message);
		setSnackbarSeverity(severity);
		setSnackbarOpen(true);
	};

	const handleSignUp = async () => {
		if (password !== confirmPassword) {
			showSnackbar('Passwords do not match', 'error');
			return;
		}

		if (password.length < 8) {
			showSnackbar('Password must be at least 8 characters long', 'error');
			return;
		}

		try {
			const { token: token } = await signUpApi({ email, password });
			localStorage.setItem('jwt-token', token);
			showSnackbar('Sign up successful', 'success');
			router.push('/operations-management/basic-information');
		} catch (error) {
			console.log('error: ', error);
			showSnackbar('User already exists', 'error');
		}
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		await handleSignUp();
	};

	return (
		<Box className="flex h-screen  w-screen justify-center bg-white">
			<Card
				className={`flex w-1/3  flex-col ${commonTextClass} rounded-none border-0`}
				elevation={0}
			>
				<CardContent>
					<div className={'md-5 ml-20 mr-20 mt-20'}>
						<Image
							src="https://i.imgur.com/2rYrqwh.png"
							alt="Logo"
							width={200}
							height={200}
						/>
					</div>
					<form onSubmit={handleSubmit}>
						<TextField
							className={`mb-4 w-full ${commonTextClass}`}
							label="帳號"
							variant="outlined"
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<TextField
							className={`mb-4 w-full ${commonTextClass}`}
							label="密碼"
							variant="outlined"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						<TextField
							className={`mb-4 w-full ${commonTextClass}`}
							label="再次確認密碼"
							variant="outlined"
							type="password"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
						/>
						<Button
							className={`mb-4 h-14 w-full bg-[#35A996] text-white ${commonTextClass}`}
							type="submit"
							variant="contained"
							sx={{ mt: 2, bgcolor: '#35A996' }}
						>
							註冊
						</Button>
						<Button
							className={`${commonTextClass} w-full`}
							sx={{ color: '#F4B63D' }}
							onClick={() => router.push('/')}
						>
							回到登入介面
						</Button>
					</form>
				</CardContent>
				<Snackbar
					open={snackbarOpen}
					autoHideDuration={6000}
					onClose={() => setSnackbarOpen(false)}
				>
					<Alert
						onClose={() => setSnackbarOpen(false)}
						severity={snackbarSeverity}
						sx={{ width: '100%' }}
					>
						{snackbarMessage}
					</Alert>
				</Snackbar>
			</Card>
		</Box>
	);
}

export default Page;
