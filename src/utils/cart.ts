import type { AddOn } from '../features/cart/cartTypes';

export function buildCartKey(menuItemId: number, addOns: AddOn[]): string {
	const addOnKey = [...addOns]
		.map((addOn) => addOn.id)
		.sort()
		.join('|');

	return `${menuItemId}__${addOnKey}`;
}

export function calculateAddOnTotal(addOns: AddOn[]): number {
	return addOns.reduce((total, addOn) => total + addOn.price, 0);
}
