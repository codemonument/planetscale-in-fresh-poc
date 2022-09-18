// Added this line to force download of this npm package,
// since normally it's transitively used by kysely-planetscale without the `npm:` identifier
// TODO: File a bug for npm specifiers, that they should be downloaded by deno even when used in an import-map!
import {} from "npm:@planetscale/database@1.3.0";

import { db } from "@/src/db/index.ts";
const result = await db.selectFrom("pets").selectAll().execute(db);

console.log("\n Pets Table");
console.table(result);
