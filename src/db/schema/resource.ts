import * as t from "drizzle-orm/pg-core";
import { timestamps } from "../helper";
import { collections } from "./collection";
import { users } from "./users";

export const resourceTypeEnum = t.pgEnum("resource_type", [
  "link",
  "code_snippet",
  "file",
]);

export const resources = t.pgTable("resources", {
  id: t.uuid().primaryKey().defaultRandom(),
  title: t.text().notNull(),
  description: t.text(),
  type: resourceTypeEnum().notNull(),
  isFavorite: t.boolean().default(false),
  collectionId: t.uuid().references(() => collections.id),
  userId: t.text().references(() => users.id),
  ...timestamps,
});
