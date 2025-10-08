import { createSesionClient } from "@/lib/appwrite";
import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";
import { Workspace } from "../types";
import { DATABASE_ID, WORKSPACES_ID } from "@/lib/config";

interface GetWorkspaceInfoProps {
  workspaceId: string;
}

export const GetWorkspaceInfo = async ({
  workspaceId,
}: GetWorkspaceInfoProps) => {
  try {
    const { databases } = await createSesionClient();

    const workspace = await databases.getDocument<Workspace>(
      DATABASE_ID,
      WORKSPACES_ID,
      workspaceId
    );
    return {
      name: workspace.name,
      image: workspace.image,
    };
  } catch {
    return null;
  }
};
