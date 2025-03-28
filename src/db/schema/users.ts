import * as t from "drizzle-orm/pg-core";
import { timestamps } from "../helper";

export const users = t.pgTable("users", {
  id: t.text().primaryKey(),
  name: t.text().notNull(),
  email: t.text().notNull().unique(),
  emailVerified: t.boolean().notNull(),
  image: t.text(),
  ...timestamps,
});
