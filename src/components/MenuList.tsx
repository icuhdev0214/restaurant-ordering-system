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
		<div className='menu-grid'>
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
