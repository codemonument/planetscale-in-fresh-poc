import { dbPromise } from "@/src/db/db.ts";

const db = await dbPromise;

const result = await db.selectFrom("pets").selectAll().execute(db);
console.log("\n Pets Table");
console.table(result);
