DROP INDEX "user_id_name_unique_idx";--> statement-breakpoint
CREATE UNIQUE INDEX "user_id_name_unique_idx" ON "collections" USING btree ("user_id","name") WHERE "collections"."deleted_at" IS NULL;