import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { AddOn, CartItem } from './cartTypes';
import type { Receipt } from './receiptTypes';
import { buildCartKey } from '../../utils/cart';
import { createReceipt } from '../../utils/checkout';

interface AddToCartPayload {
	menuItemId: number;
	name: string;
	basePrice: number;
	category: string;
	addOns: AddOn[];
}

interface CartState {
	items: CartItem[];
	lastReceipt: Receipt | null;
}

const initialState: CartState = {
	items: [],
	lastReceipt: null,
};

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addToCart(state, action: PayloadAction<AddToCartPayload>) {
			const { menuItemId, name, basePrice, category, addOns } = action.payload;
			const cartKey = buildCartKey(menuItemId, addOns);

			const existingItem = state.items.find((item) => item.cartKey === cartKey);

			if (existingItem) {
				existingItem.quantity += 1;
				return;
			}

			state.items.push({
				cartKey,
				menuItemId,
				name,
				basePrice,
				category,
				quantity: 1,
				addOns,
			});
		},

		increaseQuantity(state, action: PayloadAction<string>) {
			const item = state.items.find(
				(cartItem) => cartItem.cartKey === action.payload
			);

			if (item) {
				item.quantity += 1;
			}
		},

		decreaseQuantity(state, action: PayloadAction<string>) {
			const item = state.items.find(
				(cartItem) => cartItem.cartKey === action.payload
			);

			if (!item) {
				return;
			}

			if (item.quantity > 1) {
				item.quantity -= 1;
				return;
			}

			state.items = state.items.filter(
				(cartItem) => cartItem.cartKey !== action.payload
			);
		},

		removeFromCart(state, action: PayloadAction<string>) {
			state.items = state.items.filter(
				(item) => item.cartKey !== action.payload
			);
		},

		checkout(state) {
			if (state.items.length === 0) {
				return;
			}

			state.lastReceipt = createReceipt(state.items);
			state.items = [];
		},

		clearReceipt(state) {
			state.lastReceipt = null;
		},

		clearCart(state) {
			state.items = [];
		},
	},
});

export const {
	addToCart,
	increaseQuantity,
	decreaseQuantity,
	removeFromCart,
	checkout,
	clearReceipt,
	clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
