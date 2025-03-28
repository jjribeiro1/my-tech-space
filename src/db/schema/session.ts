import * as t from "drizzle-orm/pg-core";
import { users } from "./users";
import { timestamps } from "../helper";

export const session = t.pgTable("sessions", {
  id: t.text().primaryKey(),
  expiresAt: t.timestamp().notNull(),
  token: t.text().notNull().unique(),
  ipAddress: t.text(),
  userAgent: t.text(),
  userId: t
    .text()
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  ...timestamps,
});
