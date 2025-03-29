import * as t from "drizzle-orm/pg-core";
import { timestamps } from "../helper";
import { users } from "./users";

export const collections = t.pgTable("collections", {
  id: t.uuid().primaryKey().defaultRandom(),
  name: t.text().notNull(),
  slug: t.text().notNull(),
  description: t.text(),
  isPrivate: t.boolean().default(false).notNull().default(false),
  userId: t.text().references(() => users.id),
  ...timestamps,
});
