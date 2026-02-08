import { createUploadthing, type FileRouter } from "uploadthing/next";
import { getSession } from "./session";

const f = createUploadthing();

export const ourFileRouter = {
  fileResource: f({
    pdf: { maxFileSize: "8MB" },
    text: { maxFileSize: "8MB" },
    "application/msword": { maxFileSize: "8MB" },
    "text/plain": { maxFileSize: "8MB" },
  })
    .middleware(async () => {
      const session = await getSession();
      if (!session || !session.user) {
        throw new Error("Unauthorized");
      }
      return { session };
    })
    .onUploadComplete(async ({ file }) => {
      console.log("file url", file.ufsUrl);
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
