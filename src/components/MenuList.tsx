import MenuItemCard from './MenuItemCard';
import type { MenuItem } from '../features/menu/menuTypes';

interface MenuListProps {
	items: MenuItem[];
}

function MenuList({ items }: MenuListProps) {
	if (items.length === 0) {
		return <p>No menu items found.</p>;
	}

	return (
		<div
			style={{
				display: 'grid',
				gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
				gap: '16px',
			}}
		>
			{items.map((item) => (
				<MenuItemCard
					key={item.id}
					item={item}
				/>
			))}
		</div>
	);
}

export default MenuList;
