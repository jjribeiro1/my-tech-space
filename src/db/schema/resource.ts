import * as t from "drizzle-orm/pg-core";
import { resourceTypes } from "./resource-type";
import { timestamps } from "../helper";
import { collections } from "./collection";
import { users } from "./users";

export const resources = t.pgTable("resources", {
  id: t.uuid().primaryKey().defaultRandom(),
  title: t.text().notNull(),
  description: t.text(),
  url: t.text(),
  isFavorite: t.boolean().default(false),
  resourceTypeId: t.uuid().references(() => resourceTypes.id),
  collectionId: t.uuid().references(() => collections.id),
  userId: t.text().references(() => users.id),
  ...timestamps,
});
