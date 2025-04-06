ALTER TABLE "resources" RENAME COLUMN "name" TO "title";--> statement-breakpoint
ALTER TABLE "resources" ADD COLUMN "url" text;