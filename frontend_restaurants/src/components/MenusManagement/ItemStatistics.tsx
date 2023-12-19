'use client';

import { useState, useEffect } from 'react';

import FastfoodRoundedIcon from '@mui/icons-material/FastfoodRounded';
import NoFoodRoundedIcon from '@mui/icons-material/NoFoodRounded';
import { Box, Button, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import type { GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { GridToolbarContainer, useGridApiContext } from '@mui/x-data-grid';

import { modifyItem } from '@/lib/api/menu/api';
import type { ItemControlList, ItemControl } from '@/lib/api/menu/types';

const colWidth = 150;

const columns: GridColDef[] = [
	{ field: 'id', headerName: 'ID' },
	{
		field: 'itemName',
		headerName: '名稱',
		type: 'string',
		width: colWidth,
		align: 'right',
		headerAlign: 'right',
		disableColumnMenu: true,
	},
	{
		field: 'totalNumber',
		headerName: '總數量',
		type: 'number',
		width: colWidth,
		editable: true,
		disableColumnMenu: true,
	},
	{
		field: 'soldNumber',
		headerName: '已售出',
		type: 'number',
		width: colWidth,
		disableColumnMenu: true,
	},
	{
		field: 'leftNumber',
		headerName: '剩餘',
		type: 'number',
		width: colWidth,
		valueGetter: (params: GridValueGetterParams) =>
			params.row.totalNumber - params.row.soldNumber,
		disableColumnMenu: true,
	},
];

export default function ItemStatistics({
	tableName,
	items,
}: {
	tableName: string;
	items: ItemControlList;
}) {
	const isSelling = tableName === 'Selling';
	const [rows, setRows] = useState<ItemControlList>(items);

	const title = isSelling ? '販售中 - 品項列表' : '暫停販售 - 品項列表';
	const titleColor = isSelling ? 'text-[#35a996]' : 'text-[#f4b63d]';

	useEffect(() => {
		setRows(items);
	}, [items]);

	const handleUpdateRow = async (updatedRow: ItemControl) => {
		try {
			const responseStatus = await modifyItem(
				updatedRow.itemId,
				updatedRow.isSelling,
				updatedRow.totalNumber,
			);
			if (responseStatus === 200) {
				setRows((prevRows) =>
					prevRows.map((row) => (row.itemId === updatedRow.itemId ? updatedRow : row)),
				);
			} else {
				console.error(
					`Failed to update item ${updatedRow.itemId}. Status code: ${responseStatus}`,
				);
			}
			return updatedRow;
		} catch (error) {
			console.error('Error modifying item:', error);
			throw error;
		}
	};

	const refreshPage = () => {
		window.location.reload();
	};

	function CustomToolbar() {
		const gridContext = useGridApiContext();
		const selectedRows = Array.from(gridContext.current.getSelectedRows().values());
		if (selectedRows.length === 0) return <></>;
		const isSelling = selectedRows[0].isSelling;
		const textColor = isSelling ? 'text-[#35a996]' : 'text-[#f4b63d]';
		const bgColor = isSelling ? 'bg-[#35a996]' : 'bg-[#f4b63d]';
		const toggleSellingStatus = async () => {
			const selectedRows = Array.from(
				gridContext.current.getSelectedRows().values(),
			) as ItemControl[];

			try {
				for (const row of selectedRows) {
					const newSellingStatus = !row.isSelling;

					const responseStatus = await modifyItem(
						row.itemId,
						newSellingStatus,
						row.totalNumber,
					);
					if (responseStatus === 200) {
						setRows((prevRows) =>
							prevRows.map((r) =>
								r.itemId === row.itemId ? { ...r, isSelling: newSellingStatus } : r,
							),
						);
						refreshPage();
					} else {
						console.error(
							`Failed to update selling status for item ${row.itemId}. Status code: ${responseStatus}`,
						);
					}
				}
			} catch (error) {
				console.error('Error toggling selling status:', error);
			}
		};
		return (
			<GridToolbarContainer
				className={`flex w-full justify-between overflow-auto bg-opacity-10 ${textColor} ${bgColor}`}
			>
				<Box className="m-3">{`${selectedRows.length} selected`}</Box>
				<Box className="flex justify-end">
					<Button variant="text" onClick={toggleSellingStatus}>
						{isSelling ? '暫停販售' : '恢復販售'}
					</Button>
				</Box>
			</GridToolbarContainer>
		);
	}
	return (
		<>
			<Box className="m-3 flex">
				{isSelling ? (
					<FastfoodRoundedIcon color="primary" />
				) : (
					<NoFoodRoundedIcon color="primary" />
				)}
				<Typography className={`ml-2 text-2xl font-bold ${titleColor}`}>{title}</Typography>
			</Box>
			<DataGrid
				className="m-10 border border-black"
				columns={columns}
				rows={rows}
				getRowId={(row) => row.itemId}
				columnVisibilityModel={{
					id: false,
				}}
				processRowUpdate={handleUpdateRow}
				onProcessRowUpdateError={(error) => console.error(error)}
				disableRowSelectionOnClick
				checkboxSelection
				hideFooterSelectedRowCount
				slots={{
					toolbar: CustomToolbar,
				}}
			/>
		</>
	);
}
