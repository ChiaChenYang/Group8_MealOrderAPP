import * as React from 'react';
import type { Dispatch } from 'react';

import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { styled } from '@mui/material/styles';

const Search = styled('div')(({ theme }) => ({
	position: 'relative',
	borderRadius: theme.shape.borderRadius,
	marginLeft: 0,
	width: 'auto',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: '100%',
	position: 'absolute',
	pointerEvents: 'none',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: 'inherit',
	'& .MuiInputBase-input': {
		padding: theme.spacing(1, 1, 1, 0),
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			width: '20ch',
			'&:focus': {
				width: '20ch',
			},
		},
	},
}));

type SearchBarProps = {
	searchText: string;
	setSearchText: Dispatch<string>;
};

export default function SearchBar({ searchText, setSearchText }: SearchBarProps) {
	return (
		<Search className="bg-white">
			<SearchIconWrapper>
				<SearchIcon />
			</SearchIconWrapper>
			<StyledInputBase
				placeholder="Search…"
				inputProps={{ 'aria-label': 'search' }}
				value={searchText}
				onChange={(e) => setSearchText(e.target.value)}
			/>
		</Search>
	);
}
