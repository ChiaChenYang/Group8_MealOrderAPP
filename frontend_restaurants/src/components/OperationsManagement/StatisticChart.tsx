import { useEffect, useState } from 'react';

import { LineChart } from '@mui/x-charts/LineChart';

import useRedirect from '@/hooks/useRedirect';
import {
	getDailyReport,
	getMonthlyReport,
	getWeeklyReport,
	getYearlyReport,
} from '@/lib/api/restaurant/api';
import type { StatisticChartType } from '@/lib/types';

function TimeRange(type: string, timeOfDay: string) {
	if (type === 'year') return { start: 1, end: 12 };
	else if (type === 'month') return { start: 1, end: 5 };
	else if (type === 'week') return { start: 1, end: 7 };
	else if (type === 'day') {
		if (timeOfDay === 'all') return { start: 11, end: 20 };
		else if (timeOfDay === 'afternoon') return { start: 11, end: 16 };
		else if (timeOfDay === 'evening') return { start: 17, end: 20 };
		return { start: 0, end: 0 };
	}
	return { start: 0, end: 0 };
}

const fetchData = async (restaurantId: number, timeRange: StatisticChartType) => {
	if (restaurantId < 0) return [];
	const type = timeRange.type;
	if (type === 'year') {
		const data = await getYearlyReport(restaurantId, timeRange.year, timeRange.timeOfDay);
		return data;
	} else if (type === 'month') {
		const data = await getMonthlyReport(
			restaurantId,
			timeRange.year,
			timeRange.month || -1,
			timeRange.timeOfDay,
		);
		return data;
	} else if (type === 'week') {
		const data = await getWeeklyReport(
			restaurantId,
			timeRange.year,
			timeRange.month || -1,
			timeRange.day || -1,
			timeRange.timeOfDay,
		);
		return data;
	} else if (type === 'day') {
		const data = await getDailyReport(
			restaurantId,
			timeRange.year,
			timeRange.month || -1,
			timeRange.day || -1,
			timeRange.timeOfDay,
		);
		return data;
	}
	return [];
};

export default function StatisticChart({ timeRange }: { timeRange: StatisticChartType }) {
	const { restaurantId } = useRedirect();
	const [data, setData] = useState<number[]>([]);
	const [dataRange, setDataRange] = useState({ start: 1, end: 12 });
	useEffect(() => {
		fetchData(restaurantId, timeRange).then((fetchedData) => {
			setData(fetchedData);
			setDataRange(TimeRange(timeRange.type, timeRange.timeOfDay));
		});
	}, [restaurantId, timeRange]);

	if (data.length === 0) return <div>Loading...</div>;

	const range = Array.from({ length: dataRange.end - dataRange.start + 1 }, (_, index) =>
		(dataRange.start + index).toString(),
	);

	return (
		<LineChart
			xAxis={[{ data: range, scaleType: 'point' }]}
			series={[{ data: data }]}
			width={800}
			height={450}
		/>
	);
}
