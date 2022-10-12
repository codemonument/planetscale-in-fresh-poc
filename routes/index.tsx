import Counter from '@/islands/Counter.tsx';
import { db } from '@/src/db/db.ts';
import { PetsTable } from '@/src/db/PetsTable.ts';
import { Handlers, PageProps } from '$fresh/server.ts';
import PetTableCore from '../components/PetTableCore.tsx';
import PetTableReact from '../components/PetTableReact.tsx';

type HomePageProps = {
	filteredPets: string[];
	query: string;
};

export const handler: Handlers<HomePageProps> = {
	async GET(req: any, ctx: any) {
		const url = new URL(req.url);
		const query = url.searchParams.get('qname') || '';
		console.log('Query:', query);
		console.log('Typeof Query:', typeof query);

		// TODO: Query not working in `deno task dev` right now due to problem with npm imports in deno
		const pets: PetsTable[] = await db.selectFrom('pets').selectAll().execute(db);

		console.log('\n Pets Table');
		console.table(pets);

		let filteredPets;
		if (query.length > 0) {
			filteredPets = pets.filter((pet) => pet.name.includes(query));
		} else {
			filteredPets = pets;
		}

		console.log('\n Filtered Pets');
		console.table(filteredPets);

		return ctx.render({ filteredPets, query });
	},
};

export default function Home({ data }: PageProps<HomePageProps>) {
	const pets: any = data.filteredPets;
	const { filteredPets, query } = data;
	return (
		<div class="p-4 mx-auto max-w-screen-md">
			<h1 class="mt-6 mb-6">Planetscale in Deno - Pets Demo</h1>

			<form id="search-form" action="/" method="get">
				<label for="qname" class="mr-2 px-1">
					Search for pet name:
				</label>
				<input type="search" id="qname" name="qname" value={query} class="  mr-2 py-1 px-2" />

				<input class="py-1 px-2" type="submit" />
			</form>

			<hr class="my-2"></hr>

			<ul>
				{pets.map((pet: PetsTable) => (
					<li>{pet.name}</li>
				))}
			</ul>

			<hr class="my-2"></hr>

			{/* <PetTableCore data={pets}></PetTableCore> */}
			{/* <PetTableReact data={pets}></PetTableReact> */}
		</div>
	);
}
