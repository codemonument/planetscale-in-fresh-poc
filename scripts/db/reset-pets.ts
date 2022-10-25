import { sql } from "kysely";

import { dbPromise } from "@/src/db/db.ts";
const db = await dbPromise;

const truncatePets = sql<void>`TRUNCATE TABLE pets`;
await truncatePets.execute(db);

await db
  .insertInto("pets")
  .values([
    { id: 1, name: "Happy" },
    { id: 2, name: "Moeve" },
    { id: 3, name: "Bob" },
  ])
  .executeTakeFirstOrThrow();

const result = await db.selectFrom("pets").selectAll().execute(db);
console.log("\n Pets Table");
console.table(result);
