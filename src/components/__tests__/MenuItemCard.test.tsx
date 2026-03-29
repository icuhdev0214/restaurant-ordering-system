import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MenuItemCard from '../MenuItemCard';
import Cart from '../Cart';
import { renderWithProviders } from '../../test/renderWithProviders';

describe('MenuItemCard + Cart', () => {
	it('adds the same item twice without add-ons and increases quantity', async () => {
		const user = userEvent.setup();

		renderWithProviders(
			<div>
				<MenuItemCard
					item={{ id: 1, name: 'Burger', price: 120, category: 'Main' }}
				/>
				<Cart />
			</div>
		);

		const addButton = screen.getByRole('button', { name: /add to cart/i });

		await user.click(addButton);
		await user.click(addButton);

		const cartHeading = screen.getByRole('heading', { name: /^cart$/i });
		const cartSection = cartHeading.closest('section')!;
		const cart = within(cartSection);

		expect(cart.getAllByText('Burger')).toHaveLength(1);
		expect(cart.getByText(/subtotal/i)).toBeInTheDocument();
		expect(cart.getAllByText(/240\.00/)).toHaveLength(2);
		expect(cart.getByText('2')).toBeInTheDocument();
	});

	it('treats the same item with different add-ons as separate cart entries', async () => {
		const user = userEvent.setup();

		renderWithProviders(
			<div>
				<MenuItemCard
					item={{ id: 1, name: 'Burger', price: 120, category: 'Main' }}
				/>
				<Cart />
			</div>
		);

		const friesCheckbox = screen.getByRole('checkbox', { name: /fries/i });
		const ketchupCheckbox = screen.getByRole('checkbox', { name: /ketchup/i });
		const addButton = screen.getByRole('button', { name: /add to cart/i });

		await user.click(friesCheckbox);
		await user.click(addButton);

		await user.click(ketchupCheckbox);
		await user.click(addButton);

		const cartHeading = screen.getByRole('heading', { name: /^cart$/i });
		const cartSection = cartHeading.closest('section')!;
		const cart = within(cartSection);

		expect(cart.getAllByText('Burger')).toHaveLength(2);
	});
});
