import { useState } from 'react';
import {
	IonBadge,
	IonButton,
	IonCard,
	IonCardContent,
	IonCardHeader,
	IonCardSubtitle,
	IonCardTitle,
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
		<IonCard className='menu-card'>
			<img
				alt='Silhouette of mountains'
				src='https://ionicframework.com/docs/img/demos/card-media.png'
			/>
			<IonCardHeader>
				<IonCardTitle className='menu-title'>{item.name}</IonCardTitle>

				<div className='menu-card-top'>
					<IonBadge color='tertiary'>₱{item.price.toFixed(2)}</IonBadge>
					<span className='menu-price'>{item.category}</span>
				</div>
				<IonCardSubtitle className='menu-subtitle'>
					Customize your order with add-ons
				</IonCardSubtitle>
			</IonCardHeader>

			<IonCardContent>
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
					color='primary'
					onClick={handleAddToCart}
				>
					Add to Cart
				</IonButton>
				{/* <IonButton>
					<IonIcon
						slot='icon-only'
						icon={heart}
					></IonIcon>
				</IonButton> */}
				{/* <IonButton shape='round'>Round</IonButton> */}
			</IonCardContent>
		</IonCard>
	);
}

export default MenuItemCard;
