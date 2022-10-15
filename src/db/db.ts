// Added this empty import line to force download of @planetscale/database npm package,
// since normally it's transitively used by kysely-planetscale without the `npm:` identifier
// See Github issue: https://github.com/denoland/deno/issues/16013
import {} from "npm:@planetscale/database@1.3.0";

import { Kysely } from "kysely";
import { PlanetScaleDialect } from "kysely-planetscale";

import { PetsTable } from "./PetsTable.ts";
import { secrets } from "@/src/secrets.ts";

// Keys of this interface are table names.
interface Database {
  pets: PetsTable;
}

let dbMemo: Kysely<Database>;

export async function getDB() {
  const secretsMemo = await secrets();

  if (dbMemo) return dbMemo;

  const db: Kysely<Database> = new Kysely<Database>({
    dialect: new PlanetScaleDialect({
      host: secretsMemo.DATABASE_HOST.computed,
      username: secretsMemo.DATABASE_USERNAME.computed,
      password: secretsMemo.DATABASE_PASSWORD.computed,
    }),
  });

  dbMemo = db;
  return db;
}
