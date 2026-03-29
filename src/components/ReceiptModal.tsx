import {
	IonButton,
	IonContent,
	IonHeader,
	IonModal,
	IonTitle,
	IonToolbar,
} from '@ionic/react';

import { useAppDispatch } from '../app/hooks';
import { clearReceipt } from '../features/cart/cartSlice';
import type { Receipt } from '../features/cart/receiptTypes';

interface ReceiptModalProps {
	receipt: Receipt;
}

function ReceiptModal({ receipt }: ReceiptModalProps) {
	const dispatch = useAppDispatch();

	return (
		<IonModal isOpen>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Receipt</IonTitle>
				</IonToolbar>
			</IonHeader>

			<IonContent className='ion-padding'>
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
							className='receipt-item'
						>
							<p>
								<strong>{item.name}</strong> x {item.quantity}
							</p>
							<p>Base Price: ₱{item.basePrice.toFixed(2)}</p>
							<p>
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

				<IonButton
					expand='block'
					onClick={() => dispatch(clearReceipt())}
				>
					Close
				</IonButton>
			</IonContent>
		</IonModal>
	);
}

export default ReceiptModal;
