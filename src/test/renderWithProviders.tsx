import { render, type RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore, type PreloadedState } from '@reduxjs/toolkit';
import type { ReactElement } from 'react';
import menuReducer from '../features/menu/menuSlice';
import cartReducer from '../features/cart/cartSlice';

function createTestStore(
	preloadedState?: PreloadedState<{
		menu: ReturnType<typeof menuReducer>;
		cart: ReturnType<typeof cartReducer>;
	}>
) {
	return configureStore({
		reducer: {
			menu: menuReducer,
			cart: cartReducer,
		},
		preloadedState,
	});
}

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
	preloadedState?: PreloadedState<{
		menu: ReturnType<typeof menuReducer>;
		cart: ReturnType<typeof cartReducer>;
	}>;
}

export function renderWithProviders(
	ui: ReactElement,
	{ preloadedState, ...renderOptions }: ExtendedRenderOptions = {}
) {
	const store = createTestStore(preloadedState);

	function Wrapper({ children }: { children: React.ReactNode }) {
		return <Provider store={store}>{children}</Provider>;
	}

	return {
		store,
		...render(ui, { wrapper: Wrapper, ...renderOptions }),
	};
}
