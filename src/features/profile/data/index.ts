import "server-only";
import { cache } from "react";
import { cacheTag } from "next/cache";
import { and, desc, eq, isNull } from "drizzle-orm";
import { db } from "@/db";
import { users } from "@/db/schema/users";
import { collections } from "@/db/schema/collection";
import { resources } from "@/db/schema/resource";
import { resourceLinks } from "@/db/schema/resource-link";
import { resourceCodeSnippets } from "@/db/schema/resource-code-snippet";
import { resourceFiles } from "@/db/schema/resource-file";
import { ResourceWithType } from "@/features/resources/data";

export const PUBLIC_PROFILE_TAG = "public-profile";

export const getPublicProfile = cache(async (userId: string) => {
  "use cache";
  cacheTag(PUBLIC_PROFILE_TAG);

  const [user] = await db
    .select({
      id: users.id,
      name: users.name,
      image: users.image,
      created_at: users.created_at,
    })
    .from(users)
    .where(eq(users.id, userId));

  return user;
});

export const getPublicCollections = cache(async (userId: string) => {
  "use cache";
  cacheTag(PUBLIC_PROFILE_TAG);

  const data = await db
    .select({
      id: collections.id,
      name: collections.name,
      slug: collections.slug,
      description: collections.description,
      isPrivate: collections.isPrivate,
      userId: collections.userId,
      created_at: collections.created_at,
      updated_at: collections.updated_at,
      deleted_at: collections.deleted_at,
      resourceCount: db.$count(
        resources,
        and(
          eq(resources.collectionId, collections.id),
          isNull(resources.deleted_at),
        ),
      ),
    })
    .from(collections)
    .where(
      and(
        eq(collections.userId, userId),
        eq(collections.isPrivate, false), // Public only
        isNull(collections.deleted_at),
      ),
    )
    .orderBy(desc(collections.created_at));

  return data;
});

export const getPublicResources = cache(
  async (userId: string, collectionId?: string) => {
    "use cache";
    cacheTag(PUBLIC_PROFILE_TAG);

    const baseQuery = db
      .select({
        resource: resources,
        link: resourceLinks,
        codeSnippet: resourceCodeSnippets,
        file: resourceFiles,
      })
      .from(resources)
      .innerJoin(collections, eq(resources.collectionId, collections.id)) // Join collections to check visibility
      .leftJoin(resourceLinks, eq(resourceLinks.resourceId, resources.id))
      .leftJoin(
        resourceCodeSnippets,
        eq(resourceCodeSnippets.resourceId, resources.id),
      )
      .leftJoin(resourceFiles, eq(resourceFiles.resourceId, resources.id))
      .where(
        and(
          eq(resources.userId, userId),
          isNull(resources.deleted_at),
          eq(collections.isPrivate, false), // Enforce public collection
          collectionId ? eq(resources.collectionId, collectionId) : undefined,
        ),
      )
      .orderBy(desc(resources.created_at));

    const data = await baseQuery;

    return data.map((row) => {
      const base = row.resource;

      if (base.type === "link" && row.link) {
        return {
          ...base,
          type: "link" as const,
          link: {
            id: row.link.id,
            url: row.link.url,
          },
        };
      }

      if (base.type === "code_snippet" && row.codeSnippet) {
        return {
          ...base,
          type: "code_snippet" as const,
          codeSnippet: {
            id: row.codeSnippet.id,
            code: row.codeSnippet.code,
            language: row.codeSnippet.language,
            filename: row.codeSnippet.filename,
          },
        };
      }

      if (base.type === "file" && row.file) {
        return {
          ...base,
          type: "file" as const,
          file: {
            id: row.file.id,
            url: row.file.url,
            key: row.file.key,
            filename: row.file.filename,
            mimeType: row.file.mimeType,
            sizeBytes: row.file.sizeBytes,
          },
        };
      }

      return base as ResourceWithType;
    });
  },
);
