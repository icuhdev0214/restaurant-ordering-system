import { useState } from 'react';
import { useAppDispatch } from '../app/hooks';
import { addToCart } from '../features/cart/cartSlice';
import type { MenuItem } from '../features/menu/menuTypes';
import type { AddOn } from '../features/cart/cartTypes';

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
		<div
			style={{
				border: '1px solid #ddd',
				borderRadius: '8px',
				padding: '16px',
				background: '#fff',
			}}
		>
			<h3 style={{ marginTop: 0 }}>{item.name}</h3>
			<p style={{ margin: '8px 0' }}>Category: {item.category}</p>
			<p style={{ margin: '8px 0' }}>Price: ₱{item.price.toFixed(2)}</p>

			<div style={{ margin: '12px 0' }}>
				<p style={{ marginBottom: '8px', fontWeight: 600 }}>Add-ons</p>

				{AVAILABLE_ADD_ONS.map((addOn) => {
					const checked = selectedAddOns.some(
						(selected) => selected.id === addOn.id
					);

					return (
						<label
							key={addOn.id}
							style={{
								display: 'block',
								marginBottom: '6px',
								cursor: 'pointer',
							}}
						>
							<input
								type='checkbox'
								checked={checked}
								onChange={() => handleToggleAddOn(addOn)}
								style={{ marginRight: '8px' }}
							/>
							{addOn.name} (+₱{addOn.price.toFixed(2)})
						</label>
					);
				})}
			</div>

			<button
				type='button'
				onClick={handleAddToCart}
				style={{
					padding: '8px 12px',
					borderRadius: '6px',
					border: 'none',
					cursor: 'pointer',
				}}
			>
				Add to Cart
			</button>
		</div>
	);
}

export default MenuItemCard;
