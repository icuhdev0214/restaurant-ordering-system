import {
	createAsyncThunk,
	createSlice,
	type PayloadAction,
} from '@reduxjs/toolkit';
import type { MenuItem } from './menuTypes';
import { dedupeMenuItems } from '../../utils/dedupeMenuItems';

interface MenuState {
	items: MenuItem[];
	loading: boolean;
	error: string | null;
	searchTerm: string;
	sortBy: 'name' | 'price' | 'category';
}

const initialState: MenuState = {
	items: [],
	loading: false,
	error: null,
	searchTerm: '',
	sortBy: 'name',
};

export const fetchMenu = createAsyncThunk<MenuItem[]>(
	'menu/fetchMenu',
	async () => {
		const response = await fetch('http://localhost:3001/menu');

		if (!response.ok) {
			throw new Error('Failed to fetch menu');
		}

		const data: MenuItem[] = await response.json();
		return dedupeMenuItems(data);
	}
);

const menuSlice = createSlice({
	name: 'menu',
	initialState,
	reducers: {
		setSearchTerm(state, action: PayloadAction<string>) {
			state.searchTerm = action.payload;
		},
		setSortBy(state, action: PayloadAction<'name' | 'price' | 'category'>) {
			state.sortBy = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchMenu.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(
				fetchMenu.fulfilled,
				(state, action: PayloadAction<MenuItem[]>) => {
					state.loading = false;
					state.items = action.payload;
				}
			)
			.addCase(fetchMenu.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message ?? 'Something went wrong';
			});
	},
});

export const { setSearchTerm, setSortBy } = menuSlice.actions;
export default menuSlice.reducer;
