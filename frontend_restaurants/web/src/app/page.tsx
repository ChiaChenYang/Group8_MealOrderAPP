'use client';

import React, { useState } from 'react';
import type { SyntheticEvent } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import type { AlertColor } from '@mui/material';
import { TextField, Button, Card, CardContent, CardActions, Snackbar, Alert } from '@mui/material';
import Box from '@mui/material/Box';

import { signInApi } from '@/lib/utils/api';

function Page() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [openSnackbar, setOpenSnackbar] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState('');
	const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor>('info');
	const router = useRouter();
	const commonTextClass = 'text-base';

	const handleSignIn = async () => {
		try {
			console.log('email: ', email, 'password: ', password);
			const { token } = await signInApi({ email, password });
			showSnackbar('Sign in successful', 'success');
			localStorage.setItem('jwt-token', token);
			router.push('/home');
		} catch (error) {
			showSnackbar('Invalid email or password', 'error');
		}
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		await handleSignIn();
	};

	const showSnackbar = (message: string, severity: AlertColor) => {
		setSnackbarMessage(message);
		setSnackbarSeverity(severity);
		setOpenSnackbar(true);
	};

	const handleCloseSnackbar = (
		event: Event | SyntheticEvent<Element, Event>,
		reason?: string,
	) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpenSnackbar(false);
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
						<Button
							type="submit"
							className={`mb-4 h-14 w-full bg-[#35A996] text-white ${commonTextClass}`}
							variant="contained"
							style={{ backgroundColor: '#35A996', color: 'white' }}
						>
							登入
						</Button>
					</form>
				</CardContent>
				<CardActions className="flex w-full flex-col">
					<Button
						className={`mb-4 justify-center ${commonTextClass}`}
						style={{ color: '#000000' }}
					>
						忘記密碼？
					</Button>
					<div className={`flex flex-row items-center justify-center ${commonTextClass}`}>
						<span className={`${commonTextClass}`}>還沒註冊嗎？</span>
						<Button
							className={`${commonTextClass} m-2 min-w-0 p-0`}
							sx={{ color: '#F4B63D' }}
							onClick={() => router.push('/sign-up')}
						>
							註冊
						</Button>
					</div>
				</CardActions>
				<Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
					<Alert
						onClose={handleCloseSnackbar}
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
