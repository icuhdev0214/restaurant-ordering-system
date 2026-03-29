interface SearchBarProps {
	value: string;
	onChange: (value: string) => void;
}

function SearchBar({ value, onChange }: SearchBarProps) {
	return (
		<input
			type='text'
			placeholder='Search by name, price, or category'
			value={value}
			onChange={(event) => onChange(event.target.value)}
			style={{
				padding: '10px 12px',
				borderRadius: '8px',
				border: '1px solid #ccc',
				width: '100%',
				maxWidth: '320px',
			}}
		/>
	);
}

export default SearchBar;
