import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { db } from "@/db";
import { users } from "@/db/schema/users";
import { accounts } from "@/db/schema/account";
import { sessions } from "@/db/schema/session";
import { verifications } from "@/db/schema/verification";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      users,
      accounts,
      sessions,
      verifications,
    },
    usePlural: true,
  }),
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
  user: {
    fields: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  },
  account: {
    fields: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  },
  session: {
    fields: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  },
  verification: {
    fields: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  },
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
  },
  plugins: [nextCookies()],
});
