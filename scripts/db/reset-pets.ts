import { db } from "@/src/db/index.ts";
import { sql } from "kysely";

const truncatePets = sql<void>`TRUNCATE TABLE pets`;

await truncatePets.execute(db);

// db
//   .insertInto("pets")
//   .values({ first_name: "Jennifer", gender: "female" })
//   .returning("id")
//   .executeTakeFirstOrThrow();
