import "server-only";
import { cacheTag } from "next/cache";
import { and, desc, eq, ilike, isNull } from "drizzle-orm";
import { db } from "@/db";
import { resources } from "@/db/schema/resource";
import { resourceLinks } from "@/db/schema/resource-link";
import { resourceCodeSnippets } from "@/db/schema/resource-code-snippet";
import { resourceFiles } from "@/db/schema/resource-file";
import { GetResourcesFilters } from "./types";

export const RESOURCES_CACHE_TAG = "resources-from-user";

export type ResourceLinkData = {
  type: "link";
  link: {
    id: string;
    url: string;
  };
};

export type ResourceCodeSnippetData = {
  type: "code_snippet";
  codeSnippet: {
    id: string;
    code: string;
    language: string;
    filename: string | null;
  };
};

export type ResourceFileData = {
  type: "file";
  file: {
    id: string;
    url: string;
    key: string;
    filename: string;
    mimeType: string;
    sizeBytes: number;
  };
};

export type ResourceWithType =
  | (typeof resources.$inferSelect & ResourceLinkData)
  | (typeof resources.$inferSelect & ResourceCodeSnippetData)
  | (typeof resources.$inferSelect & ResourceFileData);

export async function getResourcesFromUser(
  userId: string,
  filters: GetResourcesFilters,
) {
  "use cache";
  cacheTag(RESOURCES_CACHE_TAG);

  const baseQuery = db
    .select({
      resource: resources,
      link: resourceLinks,
      codeSnippet: resourceCodeSnippets,
      file: resourceFiles,
    })
    .from(resources)
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
        filters?.collectionId
          ? eq(resources.collectionId, filters.collectionId)
          : undefined,
        filters?.isFavorite === "true"
          ? eq(resources.isFavorite, true)
          : undefined,
        filters?.search && filters.search.length > 0
          ? ilike(resources.title, `%${filters.search}%`)
          : undefined,
      ),
    )
    .orderBy(desc(resources.created_at))
    .limit(filters.limit);

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
}
