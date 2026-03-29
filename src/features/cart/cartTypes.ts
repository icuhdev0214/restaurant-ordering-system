export interface AddOn {
	id: string;
	name: string;
	price: number;
}

export interface CartItem {
	cartKey: string;
	menuItemId: number;
	name: string;
	basePrice: number;
	category: string;
	quantity: number;
	addOns: AddOn[];
}
