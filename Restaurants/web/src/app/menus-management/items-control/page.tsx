import { AppBar, Toolbar } from '@mui/material';
import { ThemeProvider } from '@mui/material';
import { Box } from '@mui/system';

import ItemStatistics from '@/components/MenusManagement/ItemStatistics';
import { yellowTheme } from '@/theme/Theme';

export default function ItemsControl() {
	return (
		<Box className="flex w-full flex-col items-center overflow-scroll bg-white">
			<Box className="h-[15%] w-full">
				<AppBar position="static" color="primary" sx={{ width: '100%', height: '15vh' }}>
					<Toolbar />
				</AppBar>
			</Box>

			<Box className="m-5 flex h-4/5 w-4/5 flex-col justify-center">
				<ItemStatistics tableName="Selling" />
			</Box>

			<ThemeProvider theme={yellowTheme}>
				<Box className="m-5 flex h-4/5 w-4/5 flex-col justify-center">
					<ItemStatistics tableName="Pausing" />
				</Box>
			</ThemeProvider>
		</Box>
	);
}
