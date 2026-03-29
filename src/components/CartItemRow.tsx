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
		<div
			style={{
				border: '1px solid #ddd',
				borderRadius: '8px',
				padding: '12px',
				background: '#fff',
				marginBottom: '12px',
			}}
		>
			<h4 style={{ marginTop: 0, marginBottom: '8px' }}>{item.name}</h4>
			<p style={{ margin: '4px 0' }}>Category: {item.category}</p>
			<p style={{ margin: '4px 0' }}>
				Base Price: ₱{item.basePrice.toFixed(2)}
			</p>

			<p style={{ margin: '4px 0' }}>
				Add-ons:{' '}
				{item.addOns.length > 0
					? item.addOns.map((addOn) => addOn.name).join(', ')
					: 'None'}
			</p>

			<p style={{ margin: '4px 0' }}>Unit Price: ₱{unitPrice.toFixed(2)}</p>
			<p style={{ margin: '4px 0' }}>Total: ₱{totalPrice.toFixed(2)}</p>

			<div
				style={{
					display: 'flex',
					gap: '8px',
					alignItems: 'center',
					marginTop: '10px',
				}}
			>
				<button
					type='button'
					onClick={() => dispatch(decreaseQuantity(item.cartKey))}
				>
					-
				</button>

				<span>{item.quantity}</span>

				<button
					type='button'
					onClick={() => dispatch(increaseQuantity(item.cartKey))}
				>
					+
				</button>

				<button
					type='button'
					onClick={() => dispatch(removeFromCart(item.cartKey))}
				>
					Remove
				</button>
			</div>
		</div>
	);
}

export default CartItemRow;
