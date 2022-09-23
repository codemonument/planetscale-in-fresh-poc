/**
 * Relevant import_map statements:
    "kysely": "npm:kysely@0.21.6",
    "kysely/": "npm:kysely@0.21.6/",
    "kysely-planetscale": "npm:kysely-planetscale@0.2.0",
    "kysely-planetscale/": "npm:kysely-planetscale@0.2.0/",
    "@planetscale/database": "npm:@planetscale/database@1.3.0",
    "@planetscale/database/": "npm:@planetscale/database@1.3.0/"
 */
import { Kysely, sql } from "kysely";
import { PlanetScaleDialect } from "kysely-planetscale";

// Fixes Runtime Behavior:
import {} from "npm:@planetscale/database@1.3.0";

interface PetsTable {
  id: number;

  name: string;
}

// Keys of this interface are table names.
interface Database {
  pets: PetsTable;
}

/**
 * You can create a simple playground databse on planetscale for free here:
 * https://auth.planetscale.com/sign-up
 */
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
