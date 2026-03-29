import { IonButton, IonCard, IonCardContent, IonText } from '@ionic/react';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import { checkout } from '../features/cart/cartSlice';
import {
	selectCartItems,
	selectCartSubtotal,
	selectFinalTotal,
	selectServiceCharge,
} from '../features/cart/cartSelectors';
import CartItemRow from './CartItemRow';

function Cart() {
	const dispatch = useAppDispatch();
	const items = useAppSelector(selectCartItems);
	const subtotal = useAppSelector(selectCartSubtotal);
	const serviceCharge = useAppSelector(selectServiceCharge);
	const finalTotal = useAppSelector(selectFinalTotal);

	function handleCheckout() {
		dispatch(checkout());
	}

	return (
		<section style={{ marginTop: '32px' }}>
			<h2>Cart</h2>

			{items.length === 0 ? (
				<p>Your cart is empty.</p>
			) : (
				<>
					<div>
						{items.map((item) => (
							<CartItemRow
								key={item.cartKey}
								item={item}
							/>
						))}
					</div>

					<IonCard>
						<IonCardContent>
							<IonText>
								<p>
									<strong>Subtotal:</strong> ₱{subtotal.toFixed(2)}
								</p>
							</IonText>

							<IonText>
								<p>
									<strong>Service Charge (10%):</strong> ₱
									{serviceCharge.toFixed(2)}
								</p>
							</IonText>

							<IonText>
								<p>
									<strong>Final Total:</strong> ₱{finalTotal.toFixed(2)}
								</p>
							</IonText>

							<IonButton
								expand='block'
								onClick={handleCheckout}
							>
								Checkout
							</IonButton>
						</IonCardContent>
					</IonCard>
				</>
			)}
		</section>
	);
}

export default Cart;
