// Added this empty import line to force download of @planetscale/database npm package,
// since normally it's transitively used by kysely-planetscale without the `npm:` identifier
// See Github issue: https://github.com/denoland/deno/issues/16013
// import {} from "npm:@planetscale/database@1.3.0";

// Replace npm: import with esm.sh to be able to deploy to deno deploy
import {} from "@planetscale/database";

import { Kysely } from "kysely";
import { PlanetScaleDialect } from "kysely-planetscale";

import { PetsTable } from "./PetsTable.ts";
import { secretsPromise } from "@/src/secrets.ts";

// Keys of this interface are table names.
interface Database {
  pets: PetsTable;
}

export const dbPromise: Promise<Kysely<Database>> = initDb();

async function initDb() {
  console.time("initDb");
  const secrets = await secretsPromise;

  const db: Kysely<Database> = new Kysely<Database>({
    dialect: new PlanetScaleDialect({
      host: secrets.get("DATABASE_HOST"),
      username: secrets.get("DATABASE_USERNAME"),
      password: secrets.get("DATABASE_PASSWORD"),
    }),
  });

  console.timeEnd("initDb");
  return db;
}
