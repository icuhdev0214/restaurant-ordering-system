import type { CartItem } from '../features/cart/cartTypes';
import type { Receipt } from '../features/cart/receiptTypes';
import { calculateAddOnTotal } from './cart';

export const SERVICE_CHARGE_RATE = 0.1;

export function calculateCartSubtotal(items: CartItem[]): number {
	return items.reduce((total, item) => {
		const addOnTotal = calculateAddOnTotal(item.addOns);
		return total + (item.basePrice + addOnTotal) * item.quantity;
	}, 0);
}

export function calculateServiceCharge(subtotal: number): number {
	return subtotal * SERVICE_CHARGE_RATE;
}

export function calculateFinalTotal(subtotal: number): number {
	return subtotal + calculateServiceCharge(subtotal);
}

export function createReceipt(items: CartItem[]): Receipt {
	const subtotal = calculateCartSubtotal(items);
	const serviceCharge = calculateServiceCharge(subtotal);
	const total = calculateFinalTotal(subtotal);

	return {
		id: crypto.randomUUID(),
		timestamp: new Date().toLocaleString(),
		items: items.map((item) => ({
			...item,
			addOns: [...item.addOns],
		})),
		subtotal,
		serviceCharge,
		total,
	};
}
