import React, { useState } from 'react';

import { Snackbar, Alert } from '@mui/material';
import Box from '@mui/material/Box';

type AlertColor = 'success' | 'info' | 'warning' | 'error';
type SnackBarProps = {
	message: string;
	severity: AlertColor;
	handleSnackbarClose: () => void;
};
function ShowSnackbar({ message, severity, handleSnackbarClose }: SnackBarProps) {
	const [snackbarOpen, setSnackbarOpen] = useState(true);

	const handleClose = () => {
		handleSnackbarClose();
		setSnackbarOpen(false);
	};

	return (
		<Box className="flex h-screen w-screen justify-center bg-white">
			<Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleClose}>
				<Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
					{message}
				</Alert>
			</Snackbar>
		</Box>
	);
}

export default ShowSnackbar;
