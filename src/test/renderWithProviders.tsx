import { render, type RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import type { ReactElement, ReactNode } from 'react';

import menuReducer from '../features/menu/menuSlice';
import cartReducer from '../features/cart/cartSlice';
import type { RootState } from '../app/store';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'wrapper'> {
	preloadedState?: Partial<RootState>;
}

export function renderWithProviders(
	ui: ReactElement,
	{ preloadedState, ...renderOptions }: ExtendedRenderOptions = {}
) {
	const store = configureStore({
		reducer: {
			menu: menuReducer,
			cart: cartReducer,
		},
		preloadedState: preloadedState as RootState,
	});

	function Wrapper({ children }: { children: ReactNode }) {
		return <Provider store={store}>{children}</Provider>;
	}

	return {
		store,
		...render(ui, { wrapper: Wrapper, ...renderOptions }),
	};
}
