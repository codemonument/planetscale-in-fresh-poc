import { Kysely, sql } from "kysely-npm";
import { PlanetScaleDialect } from "kysely-planetscale-npm";

// Fixes Runtime Import Behavior
// See github issue here:
// https://github.com/denoland/deno/issues/16013
// import {} from "npm:@planetscale/database@1.3.0";

// Replace npm: import with esm.sh to be able to deploy to deno deploy
import {} from "planetscale-database";

interface PetsTable {
  id: number;
  name: string;
}

// Keys of this interface are table names.
interface Database {
  pets: PetsTable;
}

export const db: Kysely<Database> = new Kysely<Database>({
  dialect: new PlanetScaleDialect({
    host: Deno.env.get("DATABASE_HOST"),
    username: Deno.env.get("DATABASE_USERNAME"),
    password: Deno.env.get("DATABASE_PASSWORD"),
  }),
});

const query = sql<any>`SHOW TABLES`;
const result = await query.execute(db);
console.log("\n Tables in Planetscale DB: ");
console.log(result);
