import { db } from "@/src/db/index.ts";

const result = await db.selectFrom("pets").selectAll().execute(db);
console.log("\n Pets Table");
console.table(result);
