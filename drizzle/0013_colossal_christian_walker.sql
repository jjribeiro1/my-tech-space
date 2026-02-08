ALTER TYPE "public"."resource_type" ADD VALUE 'file';--> statement-breakpoint
CREATE TABLE "resource_files" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"resource_id" uuid NOT NULL,
	"url" text NOT NULL,
	"key" text NOT NULL,
	"filename" text NOT NULL,
	"mime_type" text NOT NULL,
	"size_bytes" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "resource_files" ADD CONSTRAINT "resource_files_resource_id_resources_id_fk" FOREIGN KEY ("resource_id") REFERENCES "public"."resources"("id") ON DELETE cascade ON UPDATE no action;