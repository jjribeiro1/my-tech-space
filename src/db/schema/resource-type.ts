import * as t from "drizzle-orm/pg-core";
import { timestamps } from "../helper";

export const resourceTypes = t.pgTable("resource_types", {
  id: t.uuid().primaryKey().defaultRandom(),
  name: t.text().notNull(),
  ...timestamps,
});
