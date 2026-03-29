import type { MenuItem } from '../features/menu/menuTypes';

export function dedupeMenuItems(items: MenuItem[]): MenuItem[] {
	const seen = new Set<string>();

	return items.filter((item) => {
		const key = `${item.name.trim().toLowerCase()}-${item.price}-${item.category
			.trim()
			.toLowerCase()}`;

		if (seen.has(key)) {
			return false;
		}

		seen.add(key);
		return true;
	});
}
