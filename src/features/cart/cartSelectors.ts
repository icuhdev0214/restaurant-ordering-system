import type { RootState } from '../../app/store';
import { calculateAddOnTotal } from '../../utils/cart';
import {
	calculateFinalTotal,
	calculateServiceCharge,
} from '../../utils/checkout';

export function selectCartItems(state: RootState) {
	return state.cart.items;
}

export function selectCartSubtotal(state: RootState): number {
	return state.cart.items.reduce((total, item) => {
		const addOnTotal = calculateAddOnTotal(item.addOns);
		const itemTotal = (item.basePrice + addOnTotal) * item.quantity;
		return total + itemTotal;
	}, 0);
}

export function selectServiceCharge(state: RootState): number {
	const subtotal = selectCartSubtotal(state);
	return calculateServiceCharge(subtotal);
}

export function selectFinalTotal(state: RootState): number {
	const subtotal = selectCartSubtotal(state);
	return calculateFinalTotal(subtotal);
}

export function selectLastReceipt(state: RootState) {
	return state.cart.lastReceipt;
}
