import type { CartItem } from './cartTypes';

export interface Receipt {
	id: string;
	timestamp: string;
	items: CartItem[];
	subtotal: number;
	serviceCharge: number;
	total: number;
}
