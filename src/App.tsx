import { useEffect } from 'react';
import {
	IonContent,
	IonHeader,
	IonPage,
	IonTitle,
	IonToolbar,
} from '@ionic/react';

import { useAppDispatch, useAppSelector } from './app/hooks';
import { fetchMenu, setSearchTerm, setSortBy } from './features/menu/menuSlice';
import { selectFilteredAndSortedMenu } from './features/menu/menuSelectors';
import { selectLastReceipt } from './features/cart/cartSelectors';

import MenuList from './components/MenuList';
import SearchBar from './components/SearchBar';
import SortSelect from './components/SortSelect';
import Cart from './components/Cart';
import ReceiptModal from './components/ReceiptModal';

function App() {
	const dispatch = useAppDispatch();

	const { loading, error, searchTerm, sortBy } = useAppSelector(
		(state) => state.menu
	);

	const filteredItems = useAppSelector(selectFilteredAndSortedMenu);
	const receipt = useAppSelector(selectLastReceipt);

	useEffect(() => {
		void dispatch(fetchMenu());
	}, [dispatch]);

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar color='light'>
					<IonTitle>🍽️ Restaurant Ordering System</IonTitle>
				</IonToolbar>
			</IonHeader>

			<IonContent fullscreen>
				<main className='app'>
					<div className='page-intro'>
						<h1>Browse Menu and Place Your Order</h1>
						<p>
							Search, customize items with add-ons, and complete checkout with a
							generated receipt.
						</p>
					</div>

					<div className='layout'>
						<section className='menu-section'>
							<div className='section-header'>
								<h2>Menu</h2>
							</div>

							<div className='controls'>
								<SearchBar
									value={searchTerm}
									onChange={(value) => dispatch(setSearchTerm(value))}
								/>

								<SortSelect
									value={sortBy}
									onChange={(value) => dispatch(setSortBy(value))}
								/>
							</div>

							{loading && <p>Loading menu...</p>}
							{error && <p className='error'>{error}</p>}
							{!loading && !error && <MenuList items={filteredItems} />}
						</section>

						<section className='cart-section'>
							<Cart />
						</section>
					</div>
				</main>
			</IonContent>
			<ReceiptModal receipt={receipt} />
		</IonPage>
	);
}

export default App;
