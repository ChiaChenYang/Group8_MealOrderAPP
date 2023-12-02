import { useState } from 'react';

import { Button, MenuItem } from '@mui/material';
import TextField from '@mui/material/TextField';

import type { StatisticChartType, TimeRangeSelectionProps } from '@/lib/types';

import StatisticChart from './StatisticChart';

const toChinese = (en: string): string => {
	const mapping: { [key: string]: string } = {
		year: '年',
		month: '月',
		week: '周',
		day: '日',
		afternoon: '午間',
		evening: '晚間',
		all: '全日',
	};
	return mapping[en];
};

function TimeRangeSelection({ timeRange, setTimeRange }: TimeRangeSelectionProps) {
	const handleTypeChange = (type: string) => {
		const newTimeRange: StatisticChartType = {
			year: timeRange.year,
			type: type,
			timeOfDay: timeRange.timeOfDay,
		};
		if (['month', 'week', 'day'].includes(type)) {
			newTimeRange.month = timeRange.month || 1;
		}
		if (['week', 'day'].includes(type)) {
			newTimeRange.day = timeRange.day || 1;
		}
		setTimeRange(newTimeRange);
	};

	const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setTimeRange({
			...timeRange,
			[name]: value,
		});
	};

	const yearsOptions = [2021, 2022, 2023, 2024, 2025];
	const monthsOptions = Array.from({ length: 12 }, (_, i) => i + 1);
	const daysOptions = Array.from({ length: 31 }, (_, i) => i + 1);
	const timeOfDaysOptions = ['afternoon', 'evening', 'all'];

	return (
		<div className="flex space-x-4">
			{['year', 'month', 'week', 'day'].map((type) => (
				<Button
					key={type}
					variant={timeRange.type === type ? 'contained' : 'outlined'}
					onClick={() => handleTypeChange(type)}
				>
					{toChinese(type)}
				</Button>
			))}

			<TextField
				value={timeRange.year}
				name="year"
				label="年"
				select
				onChange={handleTimeChange}
			>
				{yearsOptions.map((year) => (
					<MenuItem key={year} value={year}>
						{year}
					</MenuItem>
				))}
			</TextField>

			{['month', 'week', 'day'].includes(timeRange.type) && (
				<TextField
					value={timeRange.month || monthsOptions[0]}
					name="month"
					label="月"
					select
					onChange={handleTimeChange}
				>
					{monthsOptions.map((month) => (
						<MenuItem key={month} value={month}>
							{month}
						</MenuItem>
					))}
				</TextField>
			)}

			{['week', 'day'].includes(timeRange.type) && (
				<TextField
					value={timeRange.day || daysOptions[0]}
					name="day"
					label="日"
					select
					onChange={handleTimeChange}
				>
					{daysOptions.map((day) => (
						<MenuItem key={day} value={day}>
							{day}
						</MenuItem>
					))}
				</TextField>
			)}
			<TextField
				value={timeRange.timeOfDay || timeOfDaysOptions[0]}
				name="timeOfDay"
				label="時段"
				select
				onChange={handleTimeChange}
			>
				{timeOfDaysOptions.map((timeOfDay) => (
					<MenuItem key={timeOfDay} value={timeOfDay}>
						{toChinese(timeOfDay)}
					</MenuItem>
				))}
			</TextField>
		</div>
	);
}

export default function RestaurantStatistics() {
	const [timeRange, setTimeRange] = useState<StatisticChartType>({
		year: 2023,
		type: 'year',
		timeOfDay: 'all',
	});
	return (
		<div className="flex h-screen justify-center">
			<div className="w-full">
				<div className="flex h-[15%] items-center justify-center">
					<TimeRangeSelection timeRange={timeRange} setTimeRange={setTimeRange} />
				</div>
				<div className="flex h-[70%] items-center justify-center">
					<StatisticChart timeRange={timeRange} />
				</div>
			</div>
		</div>
	);
}
