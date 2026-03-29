import Fuse from 'fuse.js';
import type { RootState } from '../../app/store';
import type { MenuItem } from './menuTypes';

export function selectFilteredAndSortedMenu(state: RootState): MenuItem[] {
	const { items, searchTerm, sortBy } = state.menu;

	let filteredItems: MenuItem[] = items;

	if (searchTerm.trim()) {
		const fuse = new Fuse(items, {
			keys: ['name', 'category', 'price'],
			threshold: 0.4,
			ignoreLocation: true,
		});

		filteredItems = fuse.search(searchTerm).map((result) => result.item);
	}

	const sortedItems = [...filteredItems].sort((a, b) => {
		if (sortBy === 'price') {
			return a.price - b.price;
		}

		return a[sortBy].localeCompare(b[sortBy]);
	});

	return sortedItems;
}
