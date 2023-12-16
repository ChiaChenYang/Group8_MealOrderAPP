import { useState } from 'react';

import Image from 'next/image';

import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import RemoveIcon from '@mui/icons-material/Remove';
import { Box, Typography, Chip, Modal, IconButton, useTheme, TextField } from '@mui/material';

import type { CategoryData, ItemMenuProps, OverviewItemListProps } from '@/lib/types';

const shapeStyles = { bgcolor: 'red', width: 10, height: 10 };

const getColor = (calories: number) => {
	if (calories < 500) {
		return 'green';
	} else if (calories < 700) {
		return 'yellow';
	} else return 'red';
};

export function SingleItem({ item }: { item: ItemMenuProps }) {
	const imageUrl = item.itemImage ? item.itemImage : '/defaultItem.png';
	const [isModalOpen, setIsModalOpen] = useState(false);
	const theme = useTheme();
	const dotStyle = { ...shapeStyles, bgcolor: getColor(item.itemCalories) };
	const maxTagsToShow = 3;
	return (
		<Box className="ml-4 flex h-full w-[300px] items-center rounded-md border px-2 shadow-md">
			<Box
				className="flex h-full w-2/3 flex-col"
				onClick={() => setIsModalOpen(true)}
				data-testid="item"
			>
				<Box className="mt-1 flex">
					<Typography className="m-0.5 text-xl font-bold" noWrap>
						{item.itemName}
					</Typography>
					<Box
						className="bg-red ml-1 mt-3"
						data-testid="circle"
						component="span"
						sx={{ ...dotStyle, borderRadius: '50%' }}
					/>
				</Box>
				<Typography className="m-0.5" noWrap>
					${item.itemPrice}
				</Typography>
				<Box className="m-0.5 flex justify-start overflow-hidden">
					{item.itemTags.map((tag, index) => (
						<Chip
							key={tag}
							label={tag}
							className="mx-1 bg-gray-200"
							style={{ display: index < maxTagsToShow ? 'inline-flex' : 'none' }}
						/>
					))}
					{item.itemTags.length > maxTagsToShow && (
						<Typography className="m-0.5">...</Typography>
					)}
				</Box>
				<Typography className="m-0.5 overflow-hidden text-ellipsis" noWrap>
					{item.itemDescription}
				</Typography>
			</Box>

			<Box
				className="mx-2 flex w-1/3 items-center justify-center"
				onClick={() => setIsModalOpen(true)}
			>
				<Image
					width={85}
					height={85}
					src={imageUrl}
					alt={item.itemName}
					style={{ objectFit: 'cover' }}
				/>
			</Box>
			<Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
				<Box
					sx={{
						position: 'absolute',
						top: '50%',
						left: '50%',
						transform: 'translate(-50%, -50%)',
						width: 450,
						bgcolor: 'background.paper',
						border: '2px solid #000',
						boxShadow: 24,
						p: 2,
						borderRadius: '16px',
						borderColor: `${theme.palette.primary.main} `,
					}}
				>
					<IconButton
						className="absolute right-2 top-2"
						onClick={() => setIsModalOpen(() => false)}
						data-testid="close-button"
					>
						<CloseIcon />
					</IconButton>

					<Box className="flex justify-between">
						<Box className="flex justify-start">
							<Typography
								id="item-modal-title"
								variant="h4"
								component="h2"
								className="font-bold"
							>
								{item.itemName}
							</Typography>
						</Box>
						<Box className="flex justify-end pr-8">
							<Chip
								key={item.itemCalories + '大卡'}
								label={item.itemCalories + '大卡'}
								className="mx-1 bg-gray-200"
							/>
							{item.itemTags.map((tag) => (
								<Chip key={tag} label={tag} className="mx-1 bg-gray-200" />
							))}
						</Box>
					</Box>
					<Typography className="my-2">$ {item.itemPrice}</Typography>

					<Typography className="my-2">{item.itemDescription}</Typography>

					<Typography variant="h6" className="my-2 font-bold">
						新增備註
					</Typography>

					<TextField className="w-full" multiline maxRows={4} placeholder="備註..." />

					<Box className="my-2 flex w-full justify-center">
						<Box className="mx-2 flex w-1/4 justify-between rounded-xl bg-gray-200 px-1 py-1">
							<RemoveIcon />
							<Typography>1</Typography>
							<AddIcon />
						</Box>
						<Box className="mx-2 flex justify-center rounded-xl bg-gray-200 py-1">
							<Typography className="mx-2 font-bold">加入購物車</Typography>
						</Box>
					</Box>
				</Box>
			</Modal>
		</Box>
	);
}

function SingleCategory({ category }: { category: CategoryData }) {
	return (
		<Box className="my-4 mr-1 flex h-[130px] max-w-full overflow-auto">
			<Box className="flex-none" style={{ width: '100px', height: '130px' }}>
				{' '}
				{/* Adjust the width and height as needed */}
				<Typography
					className="mr-1 flex h-full items-center justify-center text-2xl font-bold"
					noWrap
				>
					{category?.categoryName}
				</Typography>
			</Box>
			<Box className="flex flex-none">
				{category?.items.map((item) => <SingleItem key={item.itemId} item={item} />)}
			</Box>
		</Box>
	);
}

export default function OverviewItemList({ menu, category }: OverviewItemListProps) {
	if (category === '全部類別') {
		return (
			<Box className="flex flex-col">
				{menu.categories.map((category) => (
					<SingleCategory key={category.categoryId} category={category} />
				))}
			</Box>
		);
	} else {
		const selectedCategory = menu.categories.filter(
			(singleCategory) => singleCategory.categoryName === category,
		);
		return <SingleCategory category={selectedCategory[0]} />;
	}
}
