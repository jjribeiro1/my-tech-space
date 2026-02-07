CREATE TYPE "public"."resource_type" AS ENUM('link', 'code_snippet');--> statement-breakpoint
CREATE TABLE "resource_code_snippets" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"resource_id" uuid NOT NULL,
	"code" text NOT NULL,
	"language" text NOT NULL,
	"filename" text
);
--> statement-breakpoint
CREATE TABLE "resource_links" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"resource_id" uuid NOT NULL,
	"url" text NOT NULL,
	"favicon_url" text
);
--> statement-breakpoint
ALTER TABLE "resources" DROP CONSTRAINT IF EXISTS "resources_resource_type_id_resource_types_id_fk";
--> statement-breakpoint
ALTER TABLE "resources" ADD COLUMN "type" "resource_type";--> statement-breakpoint

-- Migrar dados existentes: criar entries em resource_links
INSERT INTO "resource_links" ("resource_id", "url")
SELECT "id", "url" 
FROM "resources" 
WHERE "url" IS NOT NULL AND "url" != '';
--> statement-breakpoint

-- Atualizar type='link' para todos os recursos existentes
UPDATE "resources" SET "type" = 'link' WHERE "type" IS NULL;
--> statement-breakpoint

-- Tornar coluna type NOT NULL
ALTER TABLE "resources" ALTER COLUMN "type" SET NOT NULL;
--> statement-breakpoint

ALTER TABLE "resource_code_snippets" ADD CONSTRAINT "resource_code_snippets_resource_id_resources_id_fk" FOREIGN KEY ("resource_id") REFERENCES "public"."resources"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "resource_links" ADD CONSTRAINT "resource_links_resource_id_resources_id_fk" FOREIGN KEY ("resource_id") REFERENCES "public"."resources"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "resources" DROP COLUMN "url";--> statement-breakpoint
ALTER TABLE "resources" DROP COLUMN "resource_type_id";
