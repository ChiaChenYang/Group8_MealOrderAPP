'use client';

import { useState, useEffect } from 'react';

import Image from 'next/image';

import ShowSnackbar from '../Snackbar';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
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
import dayjs from 'dayjs';

import {
	createRestaurantInfo,
	getRestaurantInfo,
	modifyRestaurantInfo,
	getRestaurantInfoStatus,
} from '@/lib/api/restaurant/api';
import type {
	LocationMapType,
	RestaurantFormType,
	RestaruantGroups,
	RestaruantTypes,
} from '@/lib/types';

const sampleRestaurant: RestaurantFormType = {
	restaurantId: -1,
	restaurantName: '',
	restaurantGroup: '',
	restaurantType: '',
	telephoneNumber: '',
	factoryArea: '',
	factoryLocation: '',
	restaurantLocation: '',
	latestNews: [],
	isOpening: false,
	prepareTime: 10,
	startTime: new Date('2023/11/28'),
	endTime: new Date('2023/12/28'),
	acceptingOrderType: '外帶',
};
type AlertColor = 'success' | 'info' | 'warning' | 'error';

const sampleTypes: RestaruantTypes = [
	'健康',
	'甜點',
	'飲品',
	'中式',
	'日式',
	'韓式',
	'義式',
	'美式',
	'泰式',
];
const sampleGroups: RestaruantGroups = ['固定櫃', '流動櫃'];
const sampleAreas = ['桃園', '新竹', '苗栗', '台中', '台南'];
const sampleOrderTypes = ['內用', '外帶', '皆可'];
const locationsMap: LocationMapType = {
	桃園: ['先進封測三廠'],
	新竹: [
		'台積總部及晶圓十二A廠',
		'研發中心及晶圓十二B廠',
		'晶圓二廠',
		'晶圓三廠',
		'晶圓五廠',
		'晶圓八廠',
		'先進封測一廠',
	],
	苗栗: ['先進封測六廠'],
	台中: ['晶圓十五廠', '先進封測五廠', '擴廠'],
	台南: ['晶圓六廠', '晶圓十四廠', '晶圓十八廠', '先進封測二廠'],
};

function RestaurantForm() {
	const allTypes = sampleTypes;
	const allGroups = sampleGroups;
	const allAreas = sampleAreas;
	const allOrderTypes = sampleOrderTypes;
	const [data, setData] = useState<RestaurantFormType>(sampleRestaurant);
	const [startTime, setStartTime] = useState<dayjs.Dayjs | null>(null);
	const [endTime, setEndTime] = useState<dayjs.Dayjs | null>(null);
	const theme = useTheme();

	const existingImageUrl = data?.restaurantImage || undefined;
	const [preview, setPreview] = useState(existingImageUrl || '');
	const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
	const handleSnackbarClose = () => {
		setSnackbar({ ...snackbar, open: false });
	};
	useEffect(() => {
		async function fetchData() {
			try {
				// Retrieve the id from localStorage
				const id = localStorage.getItem('id');
				const parsedId = id ? parseInt(id, 10) : null;

				if (parsedId && !isNaN(parsedId)) {
					const response = await getRestaurantInfo(parsedId);
					if (response) {
						setData(response);
						setStartTime(dayjs(response.startTime));
						setEndTime(dayjs(response.endTime));
						if (response.restaurantImage) {
							setPreview(response.restaurantImage);
						}
					}
				} else {
					console.error('Invalid or missing ID');
				}
			} catch (error) {
				console.error('Error fetching restaurant data:', error);
			}
		}

		fetchData();
	}, []);

	const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (!event.target.files) return;
		const file = event.target.files[0];

		if (file) {
			if (preview) URL.revokeObjectURL(preview);

			const reader = new FileReader();

			reader.onloadend = () => {
				const base64String = reader.result as string;
				const newData = { ...data, restaurantImage: base64String };
				setData(newData);
				const filePreview = URL.createObjectURL(file);
				setPreview(filePreview);
			};

			reader.readAsDataURL(file);
		}
	};

	const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleNewsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setData((prevData) => ({
			...prevData,
			[name]: [value],
		}));
	};

	const handleChangeOperationStatus = () => {
		const isAnyFieldEmpty =
			!data.restaurantName ||
			!data.telephoneNumber ||
			!data.factoryArea ||
			!data.factoryLocation ||
			!data.restaurantLocation ||
			!data.latestNews.length ||
			data.prepareTime === null ||
			data.prepareTime === undefined ||
			!startTime ||
			!endTime ||
			!data.acceptingOrderType;

		if (isAnyFieldEmpty) {
			setSnackbar({
				open: true,
				message: 'Each information should not be empty',
				severity: 'error',
			});
		} else {
			setData((prevData) => ({
				...prevData,
				isOpening: !prevData.isOpening,
			}));
		}
	};
	const handleSave = async () => {
		// Check for any empty fields as you did in handleChangeOperationStatus
		const isAnyFieldEmpty =
			!data.restaurantName ||
			!data.telephoneNumber ||
			!data.factoryArea ||
			!data.factoryLocation ||
			!data.restaurantLocation ||
			!data.latestNews.length ||
			data.prepareTime === null ||
			data.prepareTime === undefined ||
			!startTime ||
			!endTime ||
			!data.acceptingOrderType;

		if (isAnyFieldEmpty) {
			// Open the snackbar with the error message
			setSnackbar({
				open: true,
				message: 'Each information should not be empty',
				severity: 'error',
			});
		} else {
			try {
				const id = localStorage.getItem('id');
				const parsedId = id ? parseInt(id, 10) : -1;
				// Convert the startTime and endTime from dayjs to Date objects
				const modifiedData = {
					...data,
					restaurantId: parsedId,
					startTime: startTime?.toDate(), // Assuming startTime and endTime are Dayjs objects
					endTime: endTime?.toDate(),
				};

				const status = await getRestaurantInfoStatus(parsedId);
				console.log(status);
				if (!status) {
					// Restaurant not exist
					console.log('Restaurant not exist');
					await createRestaurantInfo(modifiedData);
				} else {
					console.log('Restaurant exist');
					await modifyRestaurantInfo(modifiedData);
				}
				// Call the API to modify the restaurant info
				// If successful, show a success message
				setSnackbar({
					open: true,
					message: 'Restaurant information updated successfully',
					severity: 'success',
				});
			} catch (error) {
				// If there's an error, show an error message
				setSnackbar({
					open: true,
					message: 'Failed to update restaurant information',
					severity: 'error',
				});
			}
		}
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
						InputLabelProps={{ shrink: true }}
						onChange={handleTextChange}
						defaultValue={data.restaurantName || ''}
						variant="standard"
					/>
					<TextField
						id="telephoneNumber"
						name="telephoneNumber"
						label="電話"
						InputLabelProps={{ shrink: true }}
						onChange={handleTextChange}
						defaultValue={data.telephoneNumber || ''}
						variant="standard"
					/>
					<TextField
						id="restaurantLocation"
						name="restaurantLocation"
						label="櫃位地點"
						InputLabelProps={{ shrink: true }}
						onChange={handleTextChange}
						defaultValue={data.restaurantLocation || ''}
						variant="standard"
					/>

					<TextField
						id="latestNews"
						name="latestNews"
						label="最新資訊"
						multiline
						rows={1}
						onChange={handleNewsChange}
						defaultValue="請輸入最新消息"
					/>

					<Box className="m-6 flex w-full flex-col">
						<Typography className="my-2 text-sm">商家圖片</Typography>
						<Box className="ml-5 flex w-1/2 flex-col items-center justify-center">
							{preview && (
								<div className="h-[126px] w-[224px]">
									<Image
										width={224}
										height={126}
										src={preview}
										alt="Preview"
										className="h-full w-full object-cover"
										style={{ objectFit: 'cover' }}
									/>
								</div>
							)}
							<Button
								variant="contained"
								component="label"
								size="small"
								className="mt-2 flex w-4/5 justify-around"
							>
								<div>上傳</div>
								<div>
									<AddAPhotoIcon />
								</div>
								<input
									type="file"
									hidden
									accept="image/*"
									onChange={handleImageChange}
								/>
							</Button>
						</Box>
					</Box>
					<TextField
						label="接受訂單種類"
						id="acceptingOrderType"
						name="acceptingOrderType"
						select
						value={data.acceptingOrderType}
						onChange={handleTextChange}
						variant="standard"
					>
						{allOrderTypes.map((type) => (
							<MenuItem key={type} value={type}>
								{type}
							</MenuItem>
						))}
					</TextField>
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

					<Box className="flex">
						<TextField
							label="地區"
							id="factoryArea"
							name="factoryArea"
							value={data.factoryArea}
							select
							onChange={handleTextChange}
							variant="standard"
						>
							{allAreas.map((area) => (
								<MenuItem key={area} value={area}>
									{area}
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
							{data.factoryArea && locationsMap[data.factoryArea] ? (
								locationsMap[data.factoryArea].map((location) => (
									<MenuItem key={location} value={location}>
										{location}
									</MenuItem>
								))
							) : (
								<MenuItem disabled>No Locations Available</MenuItem>
							)}
						</TextField>
					</Box>

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
							<DemoItem>
								<DateTimePicker
									value={startTime}
									maxDateTime={endTime}
									onChange={(date) => setStartTime(date)}
									views={['year', 'month', 'day']}
								/>
							</DemoItem>
						</label>
						<label>
							To:
							<DemoItem>
								<DateTimePicker
									value={endTime}
									minDateTime={startTime}
									onChange={(date) => setEndTime(date)}
									views={['year', 'month', 'day']}
								/>
							</DemoItem>
						</label>
					</Box>
					<Box sx={{ position: 'fixed', bottom: 30, right: 30 }}>
						<Button
							variant="contained"
							color="primary"
							onClick={handleSave}
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

					<Box className="mx-4 my-2">
						<FormControl variant="standard">
							<Stack direction="row" spacing={1} alignItems="center">
								<Typography variant="subtitle1" component="div">
									營運狀態
								</Typography>
								<Typography>Off</Typography>
								<Switch
									checked={data.isOpening}
									onChange={handleChangeOperationStatus}
									inputProps={{ 'aria-label': 'controlled' }}
								/>
								<Typography>On</Typography>
							</Stack>
						</FormControl>
					</Box>
				</Box>
			</Box>
			{snackbar.open && (
				<ShowSnackbar
					message={snackbar.message}
					severity={snackbar.severity as AlertColor}
					handleSnackbarClose={handleSnackbarClose}
				/>
			)}
		</LocalizationProvider>
	);
}

export default RestaurantForm;
