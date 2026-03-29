import {
	IonBadge,
	IonButton,
	IonCard,
	IonCardContent,
	IonCardHeader,
	IonCardTitle,
} from '@ionic/react';

import { useAppDispatch } from '../app/hooks';
import {
	decreaseQuantity,
	increaseQuantity,
	removeFromCart,
} from '../features/cart/cartSlice';
import type { CartItem } from '../features/cart/cartTypes';
import { calculateAddOnTotal } from '../utils/cart';

interface CartItemRowProps {
	item: CartItem;
}

function CartItemRow({ item }: CartItemRowProps) {
	const dispatch = useAppDispatch();

	const addOnTotal = calculateAddOnTotal(item.addOns);
	const unitPrice = item.basePrice + addOnTotal;
	const totalPrice = unitPrice * item.quantity;

	return (
		<IonCard className='cart-item-card'>
			<IonCardHeader>
				<div className='cart-item-top'>
					<IonCardTitle>{item.name}</IonCardTitle>
					<IonBadge color='warning'>x{item.quantity}</IonBadge>
				</div>
			</IonCardHeader>

			<IonCardContent>
				<div className='cart-meta'>
					<p>
						<strong>Category:</strong> {item.category}
					</p>
					<p>
						<strong>Base Price:</strong> ₱{item.basePrice.toFixed(2)}
					</p>
					<p>
						<strong>Add-ons:</strong>{' '}
						{item.addOns.length > 0
							? item.addOns.map((addOn) => addOn.name).join(', ')
							: 'None'}
					</p>
					<p>
						<strong>Unit Price:</strong> ₱{unitPrice.toFixed(2)}
					</p>
					<p>
						<strong>Total:</strong> ₱{totalPrice.toFixed(2)}
					</p>
				</div>

				<div className='quantity-row'>
					<IonButton
						size='small'
						fill='outline'
						color='medium'
						onClick={() => dispatch(decreaseQuantity(item.cartKey))}
					>
						-
					</IonButton>

					<span className='quantity-value'>{item.quantity}</span>

					<IonButton
						size='small'
						fill='outline'
						color='primary'
						onClick={() => dispatch(increaseQuantity(item.cartKey))}
					>
						+
					</IonButton>

					<IonButton
						size='small'
						color='danger'
						fill='solid'
						onClick={() => dispatch(removeFromCart(item.cartKey))}
					>
						Remove
					</IonButton>
				</div>
			</IonCardContent>
		</IonCard>
	);
}

export default CartItemRow;
