import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { createWorkspaceSchema } from "../schemas";
import { sessionMiddleware } from "@/lib/session-midleware";
import { DATABASE_ID, IMAGES_BUCKET_ID, WORKSPACES_ID } from "@/lib/config";
import { ID } from "node-appwrite";

const app = new Hono()
  .get("/", sessionMiddleware, async (c) => {
    const database = c.get("databases");

    const workspaces = await database.listDocuments(DATABASE_ID, WORKSPACES_ID);
    return c.json({ data: workspaces });
  })

  .post(
    "/",
    zValidator("form", createWorkspaceSchema),
    sessionMiddleware,
    async (c) => {
      const databases = c.get("databases");
      const user = c.get("user");
      const storage = c.get("storage");

      const { name, image } = c.req.valid("form");

      let uploadedImageUrl: string | undefined;

      if (image instanceof File) {
        const file = await storage.createFile(
          IMAGES_BUCKET_ID,
          ID.unique(),
          image
        );
        const arrayBuffer = await storage.getFileDownload(
          IMAGES_BUCKET_ID,
          file.$id
        );
        const buffer = Buffer.from(arrayBuffer);
        uploadedImageUrl = `data:image/png;base64,${buffer.toString("base64")}`;
      }

      const workspace = await databases.createDocument(
        DATABASE_ID,
        WORKSPACES_ID,
        ID.unique(),
        {
          name,
          userId: user.$id,
          image: uploadedImageUrl,
        }
      );
      return c.json({ data: workspace });
    }
  );

export default app;
