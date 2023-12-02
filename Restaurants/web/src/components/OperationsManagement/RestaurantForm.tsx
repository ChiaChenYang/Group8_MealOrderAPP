'use client';

import { useState } from 'react';

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
import type dayjs from 'dayjs';

import { LocationMapType } from '@/lib/types';
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
	factoryArea: '新竹',
	factoryLocation: '晶圓二廠',
	restaurantLocation: '十三廠一樓 23 櫃',
	latestNews: ['白飯買一送一', '周年慶'],
	isOpening: true,
	prepareTime: 10,
	startTime: new Date("2023/11/28"),
	endTime: new Date("2023/12/28"),
	acceptingOrderType: '外帶',
};

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
	const [data, setData] = useState(sampleRestaurant);
	const [startTime, setStartTime] = useState<dayjs.Dayjs | null>(null);
	const [endTime, setEndTime] = useState<dayjs.Dayjs | null>(null);
	const theme = useTheme();

	const existingImageUrl = data?.restaurantImage && URL.createObjectURL(data?.restaurantImage);
	const [preview, setPreview] = useState(existingImageUrl || '');

	const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (!event.target.files) return;
		const file = event.target.files[0];
		if (file) {
			if (preview) URL.revokeObjectURL(preview);
			const newData = { ...data, itemImage: file };
			setData(newData);
			const filePreview = URL.createObjectURL(file);
			setPreview(filePreview);
		}
	};

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

					<Box className="m-6 flex w-full flex-col">
						<Typography className="my-2 text-sm">商家圖片</Typography>
						<Box className="ml-5 flex w-1/2 flex-col items-center justify-center">
							{preview && (
								<div className="w-[224px] h-[126px]">
									<img
										src={preview}
										alt="Preview"
										className="w-full h-full object-cover"
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
							{locationsMap[data.factoryArea].map((location) => (
								<MenuItem key={location} value={location}>
									{location}
								</MenuItem>
							))}
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
			</Box>
		</LocalizationProvider>
	);
}

export default RestaurantForm;
