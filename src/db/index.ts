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
