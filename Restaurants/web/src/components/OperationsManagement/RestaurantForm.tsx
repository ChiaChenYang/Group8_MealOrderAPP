'use client';

import { useState } from 'react';

import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import type dayjs from 'dayjs';

import type {
	RestaurantFormType,
	RestaruantGroups,
	RestaruantTypes,
	RestaurantLocations,
} from '@/lib/types';

const sampleRestaurant: RestaurantFormType = {
	restaurantId: 123,
	restaurantName: '好吃餐廳',
	restaurantGroup: '流動櫃',
	restaurantType: '中式',
	telephoneNumber: '0912345678',
	factoryLocation: '新竹',
	restaurantLocation: '十三廠一樓 23 櫃',
	latestNews: ['白飯買一送一', '周年慶'],
	isOpening: true,
	openHours: [
		{
			day: 'Monday',
			startTime: new Date('9:30'),
			endTime: new Date('17:30'),
		},
		{
			day: 'Tuesday',
			startTime: new Date('9:30'),
			endTime: new Date('17:30'),
		},
	],
	prepareTime: 10,
};

const sampleTypes: RestaruantTypes = ['中式', '日式', '甜點'];
const sampleGroups: RestaruantGroups = ['固定櫃', '流動櫃'];
const sampleLocations: RestaurantLocations = ['新竹', '台北', '台南'];

function RestaurantForm() {
	const [data, setData] = useState(sampleRestaurant);
	const allTypes = sampleTypes;
	const allGroups = sampleGroups;
	const allLocations = sampleLocations;
	const [startTime, setStartTime] = useState<dayjs.Dayjs | null>(null);
	const [endTime, setEndTime] = useState<dayjs.Dayjs | null>(null);
	const theme = useTheme();

	const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<Box
				component="form"
				className="flex w-full flex-row flex-wrap bg-white"
				sx={{
					justifyContent: 'flex-start',
					'& .MuiFormControl-root': { m: 1, minWidth: '120px' },
					'& .MuiTextField-root': {
						margin: '25px !important',
						minWidth: '120px',
					},
				}}
				noValidate
				autoComplete="off"
			>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						width: '50%',
						height: '100%',
						alignItems: 'flex-start',
						paddingRight: '16px',
					}}
				>
					<TextField
						id="restaurantName"
						name="restaurantName"
						label="櫃位名稱"
						onChange={handleTextChange}
						defaultValue={data.restaurantName}
						variant="standard"
					/>
					<TextField
						id="telephoneNumber"
						name="telephoneNumber"
						label="電話"
						onChange={handleTextChange}
						defaultValue={data.telephoneNumber}
						variant="standard"
					/>
					<TextField
						id="restaurantLocation"
						name="restaurantLocation"
						label="櫃位地點"
						onChange={handleTextChange}
						defaultValue={data.restaurantLocation}
						variant="standard"
					/>

					<TextField
						id="latestNews"
						name="latestNews"
						label="最新資訊"
						multiline
						rows={1}
						onChange={handleTextChange}
						defaultValue="請輸入最新消息"
					/>
					<Box className="mx-4 my-2">
						<FormControl variant="standard">
							<Stack direction="row" spacing={1} alignItems="center">
								<Typography variant="subtitle1" component="div">
									營運狀態
								</Typography>
								<Typography>Off</Typography>
								<Switch
									checked={data.isOpening}
									onChange={() =>
										setData((prevData) => ({
											...prevData,
											isOpening: !prevData.isOpening,
										}))
									}
									inputProps={{ 'aria-label': 'controlled' }}
								/>
								<Typography>On</Typography>
							</Stack>
						</FormControl>
					</Box>
				</Box>

				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						width: '50%',
						height: '100%',
						alignItems: 'flex-start',
						paddingLeft: '16px',
					}}
				>
					<TextField
						label="櫃別"
						id="restaurantGroup"
						name="restaurantGroup"
						select
						value={data.restaurantGroup}
						onChange={handleTextChange}
						variant="standard"
					>
						{allGroups.map((group) => (
							<MenuItem key={group} value={group}>
								{group}
							</MenuItem>
						))}
					</TextField>
					<TextField
						label="類別"
						id="restaurantType"
						name="restaurantType"
						value={data.restaurantType}
						select
						onChange={handleTextChange}
						variant="standard"
					>
						{allTypes.map((type) => (
							<MenuItem key={type} value={type}>
								{type}
							</MenuItem>
						))}
					</TextField>
					<TextField
						label="廠區"
						id="factoryLocation"
						name="factoryLocation"
						value={data.factoryLocation}
						select
						onChange={handleTextChange}
						variant="standard"
					>
						{allLocations.map((location) => (
							<MenuItem key={location} value={location}>
								{location}
							</MenuItem>
						))}
					</TextField>
					<TextField
						label="預估準備時間"
						id="prepareTime"
						name="prepareTime"
						select
						value={data.prepareTime || ''}
						onChange={handleTextChange}
						variant="standard"
					>
						{[10, 20, 30, 40, 50, 60].map((time) => (
							<MenuItem key={time} value={time}>
								{time} 分鐘
							</MenuItem>
						))}
					</TextField>

					<Box className="mx-[26px] my-2 mt-5 flex">
						<label>
							From:
							{/* <LocalizationProvider dateAdapter={AdapterDayjs}> */}
							<DemoItem>
								<DateTimePicker
									maxDateTime={endTime}
									onChange={(date) => setStartTime(date)}
									views={['year', 'month', 'day']}
								/>
							</DemoItem>
							{/* </LocalizationProvider> */}
						</label>
						<label>
							To:
							{/* <LocalizationProvider dateAdapter={AdapterDayjs}> */}
							<DemoItem>
								<DateTimePicker
									minDateTime={startTime}
									onChange={(date) => setEndTime(date)}
									views={['year', 'month', 'day']}
								/>
							</DemoItem>
							{/* </LocalizationProvider> */}
						</label>
					</Box>
					<Box sx={{ position: 'fixed', bottom: 30, right: 30 }}>
						<Button
							variant="contained"
							color="primary"
							sx={{
								borderColor: `${theme.palette.primary.main} !important`,
								bgcolor: `${theme.palette.primary.main} !important`,
								color: 'black',
								borderRadius: 5,
							}}
						>
							儲存
						</Button>
					</Box>
				</Box>
			</Box>
		</LocalizationProvider>
	);
}

export default RestaurantForm;
