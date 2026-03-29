type SortOption = 'name' | 'price' | 'category';

interface SortSelectProps {
	value: SortOption;
	onChange: (value: SortOption) => void;
}

function SortSelect({ value, onChange }: SortSelectProps) {
	return (
		<div className='sort-control'>
			<label htmlFor='sortBy'>Sort by</label>
			<select
				id='sortBy'
				value={value}
				onChange={(event) => onChange(event.target.value as SortOption)}
			>
				<option value='name'>Name</option>
				<option value='price'>Price</option>
				<option value='category'>Category</option>
			</select>
		</div>
	);
}

export default SortSelect;
