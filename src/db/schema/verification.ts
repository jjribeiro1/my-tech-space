import * as t from "drizzle-orm/pg-core";
import { timestamps } from "../helper";

export const verification = t.pgTable("verifications", {
  id: t.text().primaryKey(),
  identifier: t.text().notNull(),
  value: t.text().notNull(),
  expiresAt: t.timestamp().notNull(),
  ...timestamps,
});
