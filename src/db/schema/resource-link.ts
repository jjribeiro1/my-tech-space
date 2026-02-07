import * as t from "drizzle-orm/pg-core";
import { resources } from "./resource";

export const resourceLinks = t.pgTable("resource_links", {
  id: t.uuid().primaryKey().defaultRandom(),
  resourceId: t
    .uuid()
    .references(() => resources.id, { onDelete: "cascade" })
    .notNull(),
  url: t.text().notNull(),
  faviconUrl: t.text(),
});
