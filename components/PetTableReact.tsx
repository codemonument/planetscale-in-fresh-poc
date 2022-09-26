import {
	createColumnHelper,
	ColumnDef,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from '@tanstack/react-table';
import { PetsTable } from '@/src/db/PetsTable.ts';
import {} from 'react';

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
	const { getRowModel, getHeaderGroups, ...rest } = useReactTable({
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
								{header.isPlaceholder
									? null
									: flexRender(header.column.columnDef.header, header.getContext())}
							</th>
						))}
					</tr>
				))}
			</thead>
			<tbody>
				{getRowModel().rows.map((row) => (
					<tr key={row.id}>
						{row.getVisibleCells().map((cell) => (
							<td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	);
}
