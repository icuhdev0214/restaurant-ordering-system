import { useEffect } from 'react';
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

	const { loading, error, searchTerm, sortBy, items } = useAppSelector(
		(state) => state.menu
	);

	const filteredAndSortedItems = useAppSelector(selectFilteredAndSortedMenu);
	const receipt = useAppSelector(selectLastReceipt);

	useEffect(() => {
		void dispatch(fetchMenu());
	}, [dispatch]);

	return (
		<main style={{ padding: '24px', fontFamily: 'Arial, sans-serif' }}>
			<h1>Restaurant Ordering System</h1>

			<section style={{ marginTop: '24px' }}>
				<h2>Menu</h2>
				<p>Total unique items: {items.length}</p>

				<div
					style={{
						display: 'flex',
						gap: '12px',
						flexWrap: 'wrap',
						marginBottom: '20px',
					}}
				>
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
				{error && <p style={{ color: 'red' }}>{error}</p>}
				{!loading && !error && <MenuList items={filteredAndSortedItems} />}
			</section>

			<Cart />

			{receipt && <ReceiptModal receipt={receipt} />}
		</main>
	);
}

export default App;
