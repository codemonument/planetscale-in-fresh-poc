// Added this empty import line to force download of @planetscale/database npm package,
// since normally it's transitively used by kysely-planetscale without the `npm:` identifier
// See Github issue: https://github.com/denoland/deno/issues/16013
import {} from "npm:@planetscale/database@1.3.0";

import { Kysely } from "kysely";
import { PlanetScaleDialect } from "kysely-planetscale";

import { PetsTable } from "./PetsTable.ts";
import { secretsMap } from "@/src/secrets.ts";
import { computed } from "@preact/signals";

// Keys of this interface are table names.
interface Database {
  pets: PetsTable;
}

const db = computed<Kysely<Database>>(() => {
  if (!secretsMap.value) return;

  const db: Kysely<Database> = new Kysely<Database>({
    dialect: new PlanetScaleDialect({
      host: secretsMap.value.get("DATABASE_HOST"),
      username: secretsMap.value.get("DATABASE_USERNAME"),
      password: secretsMap.value.get("DATABASE_PASSWORD"),
    }),
  });

  return db;
});
