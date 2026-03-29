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

					<div
						style={{
							marginTop: '16px',
							padding: '16px',
							background: '#fff',
							border: '1px solid #ddd',
							borderRadius: '8px',
						}}
					>
						<p aria-label={`Subtotal ${subtotal.toFixed(2)}`}>
							<strong>Subtotal:</strong> ₱{subtotal.toFixed(2)}
						</p>
						<p>
							<strong>Service Charge (10%):</strong> ₱{serviceCharge.toFixed(2)}
						</p>
						<p>
							<strong>Final Total:</strong> ₱{finalTotal.toFixed(2)}
						</p>

						<button
							type='button'
							onClick={handleCheckout}
							style={{
								marginTop: '12px',
								padding: '10px 14px',
								borderRadius: '6px',
								border: 'none',
								cursor: 'pointer',
							}}
						>
							Checkout
						</button>
					</div>
				</>
			)}
		</section>
	);
}

export default Cart;
