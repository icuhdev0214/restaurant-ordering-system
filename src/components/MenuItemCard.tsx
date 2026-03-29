import { useState } from 'react';
import {
	IonButton,
	IonCard,
	IonCardContent,
	IonCardHeader,
	IonCardTitle,
	IonText,
} from '@ionic/react';

import { useAppDispatch } from '../app/hooks';
import { addToCart } from '../features/cart/cartSlice';
import type { AddOn } from '../features/cart/cartTypes';
import type { MenuItem } from '../features/menu/menuTypes';

interface MenuItemCardProps {
	item: MenuItem;
}

const AVAILABLE_ADD_ONS: AddOn[] = [
	{ id: 'fries', name: 'Fries', price: 60 },
	{ id: 'ketchup', name: 'Ketchup', price: 10 },
];

function MenuItemCard({ item }: MenuItemCardProps) {
	const dispatch = useAppDispatch();
	const [selectedAddOns, setSelectedAddOns] = useState<AddOn[]>([]);

	function handleToggleAddOn(addOn: AddOn) {
		const exists = selectedAddOns.some((selected) => selected.id === addOn.id);

		if (exists) {
			setSelectedAddOns((prev) =>
				prev.filter((selected) => selected.id !== addOn.id)
			);
			return;
		}

		setSelectedAddOns((prev) => [...prev, addOn]);
	}

	function handleAddToCart() {
		dispatch(
			addToCart({
				menuItemId: item.id,
				name: item.name,
				basePrice: item.price,
				category: item.category,
				addOns: selectedAddOns,
			})
		);

		setSelectedAddOns([]);
	}

	return (
		<IonCard>
			<IonCardHeader>
				<IonCardTitle>{item.name}</IonCardTitle>
			</IonCardHeader>

			<IonCardContent>
				<IonText>
					<p>Category: {item.category}</p>
				</IonText>

				<IonText>
					<p>Price: ₱{item.price.toFixed(2)}</p>
				</IonText>

				<div className='addon-group'>
					<strong>Add-ons</strong>

					<div className='addon-list'>
						{AVAILABLE_ADD_ONS.map((addOn) => {
							const checked = selectedAddOns.some(
								(selected) => selected.id === addOn.id
							);

							return (
								<label
									key={addOn.id}
									className='addon-option'
								>
									<input
										type='checkbox'
										checked={checked}
										onChange={() => handleToggleAddOn(addOn)}
									/>
									<span>
										{addOn.name} (+₱{addOn.price.toFixed(2)})
									</span>
								</label>
							);
						})}
					</div>
				</div>

				<IonButton
					expand='block'
					onClick={handleAddToCart}
				>
					Add to Cart
				</IonButton>
			</IonCardContent>
		</IonCard>
	);
}

export default MenuItemCard;
