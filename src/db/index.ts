// Added this empty import line to force download of @planetscale/database npm package,
// since normally it's transitively used by kysely-planetscale without the `npm:` identifier
// See Github issue: https://github.com/denoland/deno/issues/16013
import {} from "npm:@planetscale/database@1.3.0";

import { Kysely } from "kysely";
import { PlanetScaleDialect } from "kysely-planetscale";

import { PetsTable } from "./PetsTable.ts";

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
