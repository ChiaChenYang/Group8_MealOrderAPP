import Box from '@mui/material/Box';

import Drawer from '@/components/OrdersManagement/Drawer';

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<Box className="flex h-screen w-screen flex-row bg-white">
			<Box className="flex w-[21%]">
				<Drawer />
			</Box>
			<Box className="flex w-[79%]">{children}</Box>
		</Box>
	);
}
