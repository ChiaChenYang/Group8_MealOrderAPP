"use client";

import { useState } from "react";

import FastfoodRoundedIcon from "@mui/icons-material/FastfoodRounded";
import NoFoodRoundedIcon from "@mui/icons-material/NoFoodRounded";
import { Box, Button, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { GridToolbarContainer, useGridApiContext } from "@mui/x-data-grid";

import type { ItemStatisticProps } from "@/lib/types";

function deleteRows(rows: any[]) {
  alert("deleteRows not implemented");
}

function changeRowSelling(rows: any[]) {
  alert("Change item status not implemented");
}

function CustomToolbar() {
  const gridContext = useGridApiContext();
  const selectedRows = Array.from(
    gridContext.current.getSelectedRows().values(),
  );
  if (selectedRows.length === 0) return <></>;
  const isSelling = selectedRows[0].isSelling;
  const textColor = isSelling ? "text-[#35a996]" : "text-[#f4b63d]";
  const bgColor = isSelling ? "bg-[#35a996]" : "bg-[#f4b63d]";
  return (
    <GridToolbarContainer
      className={`flex w-full justify-between overflow-auto bg-opacity-10 ${textColor} ${bgColor}`}
    >
      <Box className="m-3">{`${selectedRows.length} selected`}</Box>
      <Box className="flex justify-end">
        <Button variant="text" onClick={() => deleteRows(selectedRows)}>
          {isSelling ? "暫停販售" : "恢復販售"}
        </Button>

        <Button
          variant="text"
          onClick={() => changeRowSelling(selectedRows)}
          className="m-2 text-[#fa1f1f]"
        >
          刪除
        </Button>
      </Box>
    </GridToolbarContainer>
  );
}

const colWidth = 150;

const columns: GridColDef[] = [
  { field: "id", headerName: "ID" },
  {
    field: "itemName",
    headerName: "名稱",
    type: "string",
    width: colWidth,
    align: "right",
    headerAlign: "right",
    disableColumnMenu: true,
  },
  {
    field: "totalNumber",
    headerName: "總數量",
    type: "number",
    width: colWidth,
    editable: true,
    disableColumnMenu: true,
  },
  {
    field: "soldNumber",
    headerName: "已售出",
    type: "number",
    width: colWidth,
    disableColumnMenu: true,
  },
  {
    field: "leftNumber",
    headerName: "剩餘",
    type: "number",
    width: colWidth,
    valueGetter: (params: GridValueGetterParams) =>
      params.row.totalNumber - params.row.soldNumber,
    disableColumnMenu: true,
  },
];

const tmpSellingRows: ItemStatisticProps[] = [
  {
    id: 1,
    itemName: "排骨便當",
    totalNumber: 30,
    soldNumber: 6,
    isSelling: true,
  },
  {
    id: 2,
    itemName: "雞腿便當",
    totalNumber: 25,
    soldNumber: 8,
    isSelling: true,
  },
  {
    id: 3,
    itemName: "招牌便當",
    totalNumber: 30,
    soldNumber: 9,
    isSelling: true,
  },
  {
    id: 4,
    itemName: "養樂多",
    totalNumber: 130,
    soldNumber: 61,
    isSelling: true,
  },
  {
    id: 5,
    itemName: "塑膠袋",
    totalNumber: 999,
    soldNumber: 16,
    isSelling: true,
  },
];

const tmpPausingRows: ItemStatisticProps[] = [
  {
    id: 1,
    itemName: "排骨麵",
    totalNumber: 30,
    soldNumber: 6,
    isSelling: false,
  },
  {
    id: 2,
    itemName: "雞腿麵",
    totalNumber: 25,
    soldNumber: 8,
    isSelling: false,
  },
  {
    id: 3,
    itemName: "招牌麵",
    totalNumber: 30,
    soldNumber: 9,
    isSelling: false,
  },
  {
    id: 4,
    itemName: "養樂麵",
    totalNumber: 130,
    soldNumber: 61,
    isSelling: false,
  },
  {
    id: 5,
    itemName: "塑膠麵",
    totalNumber: 999,
    soldNumber: 16,
    isSelling: false,
  },
];

export default function ItemStatistics({ tableName }: { tableName: string }) {
  const isSelling = tableName === "Selling";
  const [rows, setRows] = useState<ItemStatisticProps[]>(
    isSelling ? tmpSellingRows : tmpPausingRows,
  );
  const title = isSelling ? "販售中 - 品項列表" : "暫停販售 - 品項列表";
  const titleColor = isSelling ? "text-[#35a996]" : "text-[#f4b63d]";
  const handleUpdateRow = (
    updatedRow: ItemStatisticProps,
    oldRow: ItemStatisticProps,
  ) => {
    const updatedData = rows.map((row) => {
      if (row.id === oldRow.id) return updatedRow;
      return row;
    });
    setRows(updatedData);
    return updatedRow;
  };

  return (
    <>
      <Box className="m-3 flex">
        {isSelling ? (
          <FastfoodRoundedIcon color="primary" />
        ) : (
          <NoFoodRoundedIcon color="primary" />
        )}
        <Typography className={`ml-2 text-2xl font-bold ${titleColor}`}>
          {title}
        </Typography>
      </Box>
      <DataGrid
        className="m-10 border border-black"
        columns={columns}
        rows={rows}
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
