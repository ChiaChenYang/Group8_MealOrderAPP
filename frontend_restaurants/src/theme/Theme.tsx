'use client';

import { createTheme } from '@mui/material/styles';

export const greenTheme = createTheme({
	palette: {
		primary: {
			main: '#35A996',
		},
		background: {
			default: '#F0F0F0',
		},
		text: {
			primary: 'rgba(0, 0, 0, 0.87)',
			secondary: 'rgba(0, 0, 0, 0.54)',
			disabled: 'rgba(0, 0, 0, 0.38)',
		},
	},
	typography: {
		fontFamily: ['Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif'].join(','),
	},
});

export const yellowTheme = createTheme({
	palette: {
		primary: {
			main: '#F4B63D',
		},
		background: {
			default: '#F0F0F0',
		},
		text: {
			primary: 'rgba(0, 0, 0, 0.87)',
			secondary: 'rgba(0, 0, 0, 0.54)',
			disabled: 'rgba(0, 0, 0, 0.38)',
		},
	},
	typography: {
		fontFamily: ['Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif'].join(','),
	},
});
