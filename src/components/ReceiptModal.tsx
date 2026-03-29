import { useAppDispatch } from '../app/hooks';
import { clearReceipt } from '../features/cart/cartSlice';
import type { Receipt } from '../features/cart/receiptTypes';

interface ReceiptModalProps {
	receipt: Receipt;
}

function ReceiptModal({ receipt }: ReceiptModalProps) {
	const dispatch = useAppDispatch();

	return (
		<div
			style={{
				marginTop: '24px',
				padding: '20px',
				background: '#fff',
				border: '1px solid #ddd',
				borderRadius: '8px',
			}}
		>
			<div
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					gap: '12px',
				}}
			>
				<h2 style={{ marginTop: 0 }}>Receipt</h2>
				<button
					type='button'
					onClick={() => dispatch(clearReceipt())}
				>
					Close
				</button>
			</div>

			<p>
				<strong>Receipt ID:</strong> {receipt.id}
			</p>
			<p>
				<strong>Timestamp:</strong> {receipt.timestamp}
			</p>

			<div style={{ marginTop: '16px' }}>
				{receipt.items.map((item) => (
					<div
						key={item.cartKey}
						style={{
							padding: '12px 0',
							borderBottom: '1px solid #eee',
						}}
					>
						<p style={{ margin: '4px 0' }}>
							<strong>{item.name}</strong> x {item.quantity}
						</p>
						<p style={{ margin: '4px 0' }}>
							Base Price: ₱{item.basePrice.toFixed(2)}
						</p>
						<p style={{ margin: '4px 0' }}>
							Add-ons:{' '}
							{item.addOns.length > 0
								? item.addOns.map((addOn) => addOn.name).join(', ')
								: 'None'}
						</p>
					</div>
				))}
			</div>

			<div style={{ marginTop: '16px' }}>
				<p>
					<strong>Subtotal:</strong> ₱{receipt.subtotal.toFixed(2)}
				</p>
				<p>
					<strong>Service Charge (10%):</strong> ₱
					{receipt.serviceCharge.toFixed(2)}
				</p>
				<p>
					<strong>Final Total:</strong> ₱{receipt.total.toFixed(2)}
				</p>
			</div>
		</div>
	);
}

export default ReceiptModal;
