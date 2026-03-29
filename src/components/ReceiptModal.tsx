import {
	IonButton,
	IonCard,
	IonCardContent,
	IonCardHeader,
	IonCardTitle,
	IonIcon,
} from '@ionic/react';
import { receiptOutline, timeOutline } from 'ionicons/icons';

import { useAppDispatch } from '../app/hooks';
import { clearReceipt } from '../features/cart/cartSlice';
import type { Receipt } from '../features/cart/receiptTypes';

interface ReceiptModalProps {
	receipt: Receipt | null;
}

function ReceiptModal({ receipt }: ReceiptModalProps) {
	const dispatch = useAppDispatch();

	if (!receipt) {
		return null;
	}

	return (
		<div
			className='receipt-overlay'
			onClick={() => dispatch(clearReceipt())}
		>
			<div
				className='receipt-container'
				onClick={(event) => event.stopPropagation()}
			>
				<IonCard className='receipt-card'>
					<div className='receipt-top-banner'>
						<div className='receipt-top-left'>
							<div className='receipt-icon-wrap'>
								<IonIcon icon={receiptOutline} />
							</div>

							<div>
								<p className='receipt-label'>Order Completed</p>
								<h2 className='receipt-heading'>Your Receipt</h2>
							</div>
						</div>

						<div className='receipt-status-badge'>Paid</div>
					</div>

					<IonCardHeader className='receipt-card-header'>
						<IonCardTitle>Order Summary</IonCardTitle>
					</IonCardHeader>

					<IonCardContent>
						<div className='receipt-meta-grid'>
							<div className='receipt-meta-box'>
								<span className='receipt-meta-title'>Receipt ID</span>
								<strong className='receipt-meta-value'>{receipt.id}</strong>
							</div>

							<div className='receipt-meta-box'>
								<span className='receipt-meta-title'>Timestamp</span>
								<strong className='receipt-meta-value receipt-time'>
									<IonIcon icon={timeOutline} />
									<span>{receipt.timestamp}</span>
								</strong>
							</div>
						</div>

						<div className='receipt-items-block'>
							<h3 className='receipt-section-title'>Items</h3>

							{receipt.items.map((item) => (
								<div
									key={item.cartKey}
									className='receipt-item-card'
								>
									<div className='receipt-item-top'>
										<div>
											<p className='receipt-item-name'>{item.name}</p>
											<p className='receipt-item-sub'>Qty: {item.quantity}</p>
										</div>

										<div className='receipt-item-price'>
											₱{(item.basePrice * item.quantity).toFixed(2)}
										</div>
									</div>

									<div className='receipt-item-details'>
										<p>
											<span>Base Price</span>
											<strong>₱{item.basePrice.toFixed(2)}</strong>
										</p>

										<p>
											<span>Add-ons</span>
											<strong>
												{item.addOns.length > 0
													? item.addOns.map((addOn) => addOn.name).join(', ')
													: 'None'}
											</strong>
										</p>
									</div>
								</div>
							))}
						</div>

						<div className='receipt-summary-card'>
							<p>
								<span>Subtotal</span>
								<strong>₱{receipt.subtotal.toFixed(2)}</strong>
							</p>
							<p>
								<span>Service Charge (10%)</span>
								<strong>₱{receipt.serviceCharge.toFixed(2)}</strong>
							</p>
							<p className='receipt-total-row'>
								<span>Final Total</span>
								<strong>₱{receipt.total.toFixed(2)}</strong>
							</p>
						</div>

						<IonButton
							expand='block'
							color='primary'
							className='receipt-close-btn'
							onClick={() => dispatch(clearReceipt())}
						>
							Close Receipt
						</IonButton>
					</IonCardContent>
				</IonCard>
			</div>
		</div>
	);
}

export default ReceiptModal;
