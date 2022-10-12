interface SimpleListProps {
	list: { id: number; name: string }[];
}

export default function SimpleList(props: SimpleListProps) {
	const { list } = props;
	return (
		<ul>
			{list.map((item) => (
				<li key={item.id}>{item.name}</li>
			))}
		</ul>
	);
}
