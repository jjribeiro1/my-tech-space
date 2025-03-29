import * as t from "drizzle-orm/pg-core";
import { users } from "./users";
import { timestamps } from "../helper";

export const accounts = t.pgTable("accounts", {
  id: t.text().primaryKey(),
  accountId: t.text().notNull(),
  providerId: t.text().notNull(),
  userId: t
    .text()
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  accessToken: t.text(),
  refreshToken: t.text(),
  idToken: t.text(),
  accessTokenExpiresAt: t.timestamp(),
  refreshTokenExpiresAt: t.timestamp(),
  scope: t.text(),
  password: t.text(),
  ...timestamps,
});
