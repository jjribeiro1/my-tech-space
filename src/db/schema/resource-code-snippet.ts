import * as t from "drizzle-orm/pg-core";
import { resources } from "./resource";

export const resourceCodeSnippets = t.pgTable("resource_code_snippets", {
  id: t.uuid().primaryKey().defaultRandom(),
  resourceId: t
    .uuid()
    .references(() => resources.id, { onDelete: "cascade" })
    .notNull(),
  code: t.text().notNull(),
  language: t.text().notNull(),
  filename: t.text(),
});
