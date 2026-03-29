import { dedupeMenuItems } from '../dedupeMenuItems';
import type { MenuItem } from '../../features/menu/menuTypes';

describe('dedupeMenuItems', () => {
	it('removes duplicates with the same name, price, and category', () => {
		const items: MenuItem[] = [
			{ id: 1, name: 'Burger', price: 120, category: 'Main' },
			{ id: 2, name: 'Burger', price: 120, category: 'Main' },
			{ id: 3, name: 'Pizza', price: 250, category: 'Main' },
		];

		const result = dedupeMenuItems(items);

		expect(result).toHaveLength(2);
		expect(result).toEqual([
			{ id: 1, name: 'Burger', price: 120, category: 'Main' },
			{ id: 3, name: 'Pizza', price: 250, category: 'Main' },
		]);
	});

	it('keeps items when one of name, price, or category is different', () => {
		const items: MenuItem[] = [
			{ id: 1, name: 'Burger', price: 120, category: 'Main' },
			{ id: 2, name: 'Burger', price: 130, category: 'Main' },
			{ id: 3, name: 'Burger', price: 120, category: 'Snack' },
		];

		const result = dedupeMenuItems(items);

		expect(result).toHaveLength(3);
	});
});
