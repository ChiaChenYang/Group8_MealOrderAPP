import { useEffect, useState } from 'react';

import { LineChart } from '@mui/x-charts/LineChart';

import type { StatisticChartType } from '@/lib/types';

function TimeRange(type: string, timeOfDay: string) {
	if (type === 'year') return { start: 1, end: 12 };
	else if (type === 'month') return { start: 1, end: 4 };
	else if (type === 'week') return { start: 1, end: 7 };
	else if (type === 'day') {
		if (timeOfDay === 'all') return { start: 11, end: 20 };
		else if (timeOfDay === 'afternoon') return { start: 11, end: 16 };
		else if (timeOfDay === 'evening') return { start: 17, end: 20 };
		return { start: 0, end: 0 };
	}
	return { start: 0, end: 0 };
}

const sampleYearAfternoonData = [
	15673, 14443, 18923, 18989, 19828, 12314, 14214, 14443, 18923, 18989, 19828, 12314,
];
const sampleYearEveningData = [
	15673, 14443, 18923, 18989, 19828, 12314, 14214, 14443, 18923, 18989, 19828, 12314,
];
const sampleYearAllData = [
	15673, 14443, 18923, 18989, 19828, 12314, 14214, 14443, 18923, 18989, 19828, 12314,
];
const sampleMonthAfternoonData = [15673, 14443, 18923, 18989];
const sampleMonthEveningData = [15673, 14443, 18923, 18989];
const sampleMonthAllData = [15673, 14443, 18923, 18989];
const sampleWeekAfternoonData = [15673, 14443, 18923, 18989, 19828, 12314, 14214];
const sampleWeekEveningData = [15673, 14443, 18923, 18989, 19828, 12314, 14214];
const sampleWeekAllData = [15673, 14443, 18923, 18989, 19828, 12314, 14214];
const sampleDayAfternoonData = [15673, 14443, 18923, 18989, 19828, 12314];
const sampleDayEveningData = [15673, 14443, 18923, 18989];
const sampleDayAllData = [15673, 14443, 18923, 18989, 19828, 12314, 14214, 19828, 12314, 14214];

const fetchData = async (timeRange: StatisticChartType) => {
	if (timeRange.type === 'day' && timeRange.timeOfDay === 'all') return sampleDayAllData;
	else if (timeRange.type === 'day' && timeRange.timeOfDay === 'afternoon')
		return sampleDayAfternoonData;
	else if (timeRange.type === 'day' && timeRange.timeOfDay === 'evening')
		return sampleDayEveningData;
	else if (timeRange.type === 'week' && timeRange.timeOfDay === 'all') return sampleWeekAllData;
	else if (timeRange.type === 'week' && timeRange.timeOfDay === 'afternoon')
		return sampleWeekAfternoonData;
	else if (timeRange.type === 'week' && timeRange.timeOfDay === 'evening')
		return sampleWeekEveningData;
	else if (timeRange.type === 'month' && timeRange.timeOfDay === 'all') return sampleMonthAllData;
	else if (timeRange.type === 'month' && timeRange.timeOfDay === 'afternoon')
		return sampleMonthAfternoonData;
	else if (timeRange.type === 'month' && timeRange.timeOfDay === 'evening')
		return sampleMonthEveningData;
	else if (timeRange.type === 'year' && timeRange.timeOfDay === 'all') return sampleYearAllData;
	else if (timeRange.type === 'year' && timeRange.timeOfDay === 'afternoon')
		return sampleYearAfternoonData;
	else if (timeRange.type === 'year' && timeRange.timeOfDay === 'evening')
		return sampleYearEveningData;
	else return [];
};

export default function StatisticChart({ timeRange }: { timeRange: StatisticChartType }) {
	const [data, setData] = useState(sampleYearAllData);
	const [dataRange, setDataRange] = useState({ start: 1, end: 12 });
	useEffect(() => {
		fetchData(timeRange).then((fetchedData) => {
			setData(fetchedData);
			setDataRange(TimeRange(timeRange.type, timeRange.timeOfDay));
		});
	}, [timeRange]);

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
