import { createColumnHelper, ColumnDef, createTable, getCoreRowModel } from '@tanstack/table-core';
import { PetsTable } from '@/src/db/PetsTable.ts';

const columnHelper = createColumnHelper<PetsTable>();

const columnDef: ColumnDef<PetsTable>[] = [
	columnHelper.accessor('id', {
		header: 'Pet ID',
		cell: (props) => props.getValue(),
	}),
	columnHelper.accessor('name', {
		header: 'Name of Pet',
		cell: (props) => <span>{props.getValue().toUpperCase()}</span>,
	}),

	// Computed Column
	columnHelper.accessor((row) => `${row.id} - ${row.name}`, { id: 'combined' }),
];

/**
 * See TanStack React Table CodeSandbox:
 * https://codesandbox.io/s/github/tanstack/table/tree/main/examples/react/basic?from-embed
 */
export default function PetTable({ data }) {
	const { getRowModel, getHeaderGroups, ...rest } = createTable({
		data,
		columns: columnDef,
		getCoreRowModel: getCoreRowModel(),
	});

	console.log(getRowModel().rows);
	// console.log(rest)
	// console.log(rest);

	return (
		<table>
			<thead>
				{getHeaderGroups().map((headerGroup) => (
					<tr key={headerGroup.id}>
						{headerGroup.headers.map((header) => (
							<th key={header.id}>
								{header.isPlaceholder ? null : header.column.columnDef.header}
							</th>
						))}
					</tr>
				))}
			</thead>
			<tbody>
				{getRowModel().rows.map((row) => (
					<tr key={row.id}>
						{row.getVisibleCells().map((cell) => (
							<td key={cell.id}>{cell}</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	);
}
