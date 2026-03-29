import {
	IonButton,
	IonCard,
	IonCardContent,
	IonCardHeader,
	IonCardTitle,
} from '@ionic/react';

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
		<section className='cart-wrapper'>
			<h2>Cart</h2>

			{items.length === 0 ? (
				<IonCard className='empty-cart-card'>
					<IonCardContent>
						<p>Your cart is empty.</p>
					</IonCardContent>
				</IonCard>
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

					<IonCard className='summary-card'>
						<IonCardHeader>
							<IonCardTitle>Order Summary</IonCardTitle>
						</IonCardHeader>

						<IonCardContent>
							<div className='summary-lines'>
								<p>
									<span>Subtotal</span>
									<strong>₱{subtotal.toFixed(2)}</strong>
								</p>
								<p>
									<span>Service Charge (10%)</span>
									<strong>₱{serviceCharge.toFixed(2)}</strong>
								</p>
								<p className='summary-total'>
									<span>Final Total</span>
									<strong>₱{finalTotal.toFixed(2)}</strong>
								</p>
							</div>

							<IonButton
								expand='block'
								color='success'
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
