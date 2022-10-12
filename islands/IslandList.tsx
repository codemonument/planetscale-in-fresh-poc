interface IslandListProps {
	list: { id: number; name: string }[];
}

export default function IslandList(props: IslandListProps) {
	const { list } = props;
	return (
		<ul>
			{list.map((item) => (
				<li key={item.id}>{item.name}</li>
			))}
		</ul>
	);
}
