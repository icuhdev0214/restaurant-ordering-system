type SortOption = 'name' | 'price' | 'category';

interface SortSelectProps {
	value: SortOption;
	onChange: (value: SortOption) => void;
}

function SortSelect({ value, onChange }: SortSelectProps) {
	return (
		<select
			value={value}
			onChange={(event) => onChange(event.target.value as SortOption)}
			style={{
				padding: '10px 12px',
				borderRadius: '8px',
				border: '1px solid #ccc',
			}}
		>
			<option value='name'>Sort by Name</option>
			<option value='price'>Sort by Price</option>
			<option value='category'>Sort by Category</option>
		</select>
	);
}

export default SortSelect;
