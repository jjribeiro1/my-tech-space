import * as t from "drizzle-orm/pg-core";
import { resourceTypes } from "./resource-type";
import { timestamps } from "../helper";
import { collections } from "./collection";

export const resources = t.pgTable("resources", {
  id: t.uuid().primaryKey().defaultRandom(),
  title: t.text().notNull(),
  description: t.text(),
  url: t.text(),
  resourceTypeId: t.uuid().references(() => resourceTypes.id),
  collectionId: t.uuid().references(() => collections.id),
  ...timestamps,
});
