import * as t from "drizzle-orm/pg-core";
import { timestamps } from "../helper";
import { users } from "./users";
import { uniqueIndex } from "drizzle-orm/pg-core";

export const collections = t.pgTable(
  "collections",
  {
    id: t.uuid().primaryKey().defaultRandom(),
    name: t.text().notNull(),
    slug: t.text().notNull(),
    description: t.text(),
    isPrivate: t.boolean().default(false).notNull().default(false),
    userId: t.text().references(() => users.id),
    ...timestamps,
  },
  (table) => [
    uniqueIndex("user_id_name_unique_idx").on(table.userId, table.name),
  ],
);
