import * as t from "drizzle-orm/pg-core";
import { resources } from "./resource";

export const resourceFiles = t.pgTable("resource_files", {
  id: t.uuid().primaryKey().defaultRandom(),
  resourceId: t
    .uuid()
    .references(() => resources.id, { onDelete: "cascade" })
    .notNull(),
  url: t.text().notNull(),
  key: t.text().notNull(),
  filename: t.text().notNull(),
  mimeType: t.text().notNull(),
  sizeBytes: t.integer().notNull(),
});
