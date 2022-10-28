import { Head } from '$fresh/runtime.ts';
import { dbPromise } from '@/src/db/db.ts';
import { PetsTable } from '@/src/db/PetsTable.ts';
import { Handlers, PageProps } from '$fresh/server.ts';
// import PetTableCore from '../components/PetTableCore.tsx';
// import PetTableReact from '../components/PetTableReact.tsx';
import IslandList from '../islands/IslandList.tsx';
import SimpleList from '../components/SimpleList.tsx';

type HomePageProps = {
	filteredPets: string[];
	query: string;
};

export const handler: Handlers<HomePageProps> = {
	async GET(req: any, ctx: any) {
		console.debug('\nStarting indexHandler');
		const db = await dbPromise;

		console.time(`indexHandler`);
		const url = new URL(req.url);
		const query = url.searchParams.get('qname') || '';
		if (query.length > 0) console.log('Search Query: ', query);

		// TODO: Query not working in `deno task dev` right now due to problem with npm imports in deno
		const pets: PetsTable[] = await db.selectFrom('pets').selectAll().execute();

		console.log('\n Pets Table');
		console.table(pets);

		let filteredPets;
		if (query.length > 0) {
			filteredPets = pets.filter((pet) => pet.name.includes(query));
			console.log('\n Filtered Pets');
			console.table(filteredPets);
		} else {
			filteredPets = pets;
		}

		console.timeEnd(`indexHandler`);
		return ctx.render({ filteredPets, query });
	},
};

export default function Home({ data }: PageProps<HomePageProps>) {
	const pets: any = data.filteredPets;
	const { filteredPets, query } = data;
	return (
		<>
			<Head>
				<title>Planetscale in Deno</title>
				<link rel="stylesheet" href="https://unpkg.com/open-props/open-props.min.css" />
				<link rel="stylesheet" href="https://unpkg.com/open-props/normalize.min.css" />
				{/* TODO: Check problems with button.min.css loading from unpkg! */}
				{/* <link rel="stylesheet" href="https://unpkg.com/open-props/buttons.min.css" /> */}

				{/* <link rel="stylesheet" href="https://unpkg.com/open-props/indigo-hsl.min.css" /> */}

				<link rel="stylesheet" href="/global.css"></link>
			</Head>
			<div class="container">
				<h1>Planetscale in Deno - Pets Demo</h1>

				<form id="search-form" action="/" method="get">
					<label for="qname">Search for pet name:</label>
					<input type="search" id="qname" name="qname" value={query} />

					<input type="submit" />
				</form>

				<h2>Pet List</h2>

				{/* <IslandList list={pets}></IslandList> */}
				<SimpleList list={pets}></SimpleList>

				{/* <PetTableCore data={pets}></PetTableCore> */}
				{/* <PetTableReact data={pets}></PetTableReact> */}
			</div>
		</>
	);
}
