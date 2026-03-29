import { IonButton, IonCard, IonCardContent, IonText } from '@ionic/react';

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
		<IonCard>
			<IonCardContent>
				<h4>{item.name}</h4>

				<IonText>
					<p>Category: {item.category}</p>
				</IonText>

				<IonText>
					<p>Base Price: ₱{item.basePrice.toFixed(2)}</p>
				</IonText>

				<IonText>
					<p>
						Add-ons:{' '}
						{item.addOns.length > 0
							? item.addOns.map((addOn) => addOn.name).join(', ')
							: 'None'}
					</p>
				</IonText>

				<IonText>
					<p>Unit Price: ₱{unitPrice.toFixed(2)}</p>
				</IonText>

				<IonText>
					<p>Total: ₱{totalPrice.toFixed(2)}</p>
				</IonText>

				<div className='quantity-row'>
					<IonButton
						size='small'
						fill='outline'
						onClick={() => dispatch(decreaseQuantity(item.cartKey))}
					>
						-
					</IonButton>

					<span className='quantity-value'>{item.quantity}</span>

					<IonButton
						size='small'
						fill='outline'
						onClick={() => dispatch(increaseQuantity(item.cartKey))}
					>
						+
					</IonButton>

					<IonButton
						size='small'
						color='danger'
						fill='clear'
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
