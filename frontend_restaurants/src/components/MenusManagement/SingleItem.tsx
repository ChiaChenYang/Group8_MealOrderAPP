import React, { useState } from 'react';

import Image from 'next/image';

import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';

import type { SingleItemProps } from '@/lib/types';

function SingleItem({ item, setItem }: SingleItemProps) {
	const [tagInput, setTagInput] = useState('');
	const existingImageUrl = item?.itemImage || '';
	const [preview, setPreview] = useState(existingImageUrl);

	const handleTagDelete = (chipToDelete: string) => () => {
		const newItem = {
			...item,
			itemTags: item.itemTags.filter((chip) => chip !== chipToDelete),
		};
		setItem(newItem);
	};

	const handleTagAdd = () => {
		if (tagInput && !item.itemTags.includes(tagInput)) {
			const newItem = { ...item, itemTags: [...item.itemTags, tagInput] };
			setItem(newItem);
			setTagInput('');
		}
	};

	const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (!event.target.files) return;
		const file = event.target.files[0];

		if (file) {
			if (preview) URL.revokeObjectURL(preview);

			const reader = new FileReader();

			reader.onloadend = () => {
				const base64String = reader.result as string;
				const newItem = { ...item, itemImage: base64String };
				setItem(newItem);
				setPreview(base64String);
			};

			reader.readAsDataURL(file);
		}
	};

	const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		let updatedValue: string | number = value;

		// Convert to number if the field is itemPrice or itemCalories
		if (name === 'itemPrice' || name === 'itemCalories') {
			updatedValue = value !== '' ? parseFloat(value) : ''; // Convert to number, default to 0 if empty
		}

		const newItem = { ...item, [name]: updatedValue };
		setItem(newItem);
	};

	return (
		<Box className="relative mx-auto flex h-full w-full rounded-lg bg-white outline-none">
			<Box className="flex w-1/2 flex-col items-start">
				<TextField
					id="itemName"
					name="itemName"
					label="品項名稱"
					value={item.itemName}
					onChange={handleTextChange}
					variant="standard"
					className="w-2/5"
				/>
				<Box className="my-4 flex w-full justify-between">
					<Box className="flex w-2/5 flex-col items-center justify-center">
						{preview && (
							<div style={{ width: '100px', height: '100px' }}>
								<Image
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
					<TextField
						id="itemDescription"
						name="itemDescription"
						label="餐點描述"
						multiline
						rows={5}
						value={item.itemDescription}
						onChange={handleTextChange}
						variant="outlined"
						className="mx-8 h-1/2 w-3/5"
					/>
				</Box>
			</Box>
			<Box className="ml-5 flex w-1/2 flex-col items-start">
				<TextField
					id="itemPrice"
					name="itemPrice"
					type="number"
					label="餐點價格"
					value={item.itemPrice}
					variant="standard"
					className="my-2 flex-grow"
					onChange={handleTextChange}
					InputProps={{
						endAdornment: <InputAdornment position="end">台幣</InputAdornment>,
					}}
				/>
				<TextField
					id="itemCalories"
					name="itemCalories"
					label="餐點熱量"
					type="number"
					value={item.itemCalories}
					variant="standard"
					className="my-2 flex-grow"
					onChange={handleTextChange}
					InputProps={{
						endAdornment: <InputAdornment position="end">大卡</InputAdornment>,
					}}
				/>

				<div className="my-4 flex flex-wrap gap-2">
					<div className="items-center">標籤：</div>
					{item.itemTags.map((tag) => (
						<Chip
							key={tag}
							label={tag}
							onDelete={handleTagDelete(tag)}
							className="bg-gray-200"
						/>
					))}

					<TextField
						id="itemTags"
						label="新標籤"
						value={tagInput}
						onChange={(e) => setTagInput(e.target.value)}
						onKeyDown={(e) => {
							if (e.key === 'Enter') {
								e.preventDefault();
								handleTagAdd();
							}
						}}
						variant="outlined"
						className="w-[80px]"
						size="small"
					/>
				</div>
			</Box>
		</Box>
	);
}

export default SingleItem;
