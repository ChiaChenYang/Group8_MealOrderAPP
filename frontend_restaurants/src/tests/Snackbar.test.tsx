import React from 'react';

import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';

import ShowSnackbar from '@/components/Snackbar';

describe('ShowSnackbar', () => {
	test('renders a snackbar with the given message and severity', () => {
		const message = 'This is a test message';
		const severity = 'success';
		const handleSnackbarClose = jest.fn();

		render(
			<ShowSnackbar
				message={message}
				severity={severity}
				handleSnackbarClose={handleSnackbarClose}
			/>,
		);
		expect(screen.getByText(message)).toBeInTheDocument();
		expect(screen.getByRole('alert')).toHaveClass(`MuiAlert-standardSuccess`);
	});

	test('calls the handleSnackbarClose function when the close button is clicked', () => {
		const message = 'This is a test message';
		const severity = 'success';
		const handleSnackbarClose = jest.fn();

		render(
			<ShowSnackbar
				message={message}
				severity={severity}
				handleSnackbarClose={handleSnackbarClose}
			/>,
		);

		const closeButton = screen.getByRole('button', { name: 'Close' });
		fireEvent.click(closeButton);

		expect(handleSnackbarClose).toHaveBeenCalled();
	});
});
