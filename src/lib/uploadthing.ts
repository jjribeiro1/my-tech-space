import { createUploadthing, type FileRouter } from "uploadthing/next";
import { getSession } from "./session";
import {
  hasQuotaForUpload,
  STORAGE_QUOTA_BYTES,
  formatBytes,
} from "./storage-quota";

const f = createUploadthing();

export const ourFileRouter = {
  fileResource: f({
    pdf: { maxFileSize: "8MB" },
    text: { maxFileSize: "8MB" },
    "application/msword": { maxFileSize: "8MB" },
    "text/plain": { maxFileSize: "8MB" },
  })
    .middleware(async ({ files }) => {
      const session = await getSession();
      if (!session || !session.user) {
        throw new Error("Unauthorized");
      }

      // Calculate total size of files being uploaded
      const totalSize = files.reduce((acc, file) => acc + file.size, 0);

      // Check if user has enough quota
      const hasQuota = await hasQuotaForUpload(session.user.id, totalSize);
      if (!hasQuota) {
        throw new Error(
          `Storage quota exceeded. You have ${formatBytes(
            STORAGE_QUOTA_BYTES,
          )} total.`,
        );
      }

      return { session, totalSize };
    })
    .onUploadComplete(async ({ file }) => {
      console.log("file url", file.ufsUrl);
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
