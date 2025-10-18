import { createSesionClient } from "@/lib/appwrite"
import { getMember } from "../members/utils";
import { DATABASE_ID, PROJECTS_ID } from "@/lib/config";
import { Project } from "./type";

interface GetProjectProps{
    projectId:string
}

export const getProjects = async ({projectId}:GetProjectProps) => {
    try {
        const { databases, account } = await createSesionClient();

        const user = await account.get();

       const project = await databases.getDocument<Project>(
         DATABASE_ID,
         PROJECTS_ID,
         projectId
       );

       const member = await getMember({
         databases,
         userId: user.$id,
         workspaceId: project.workspaceId,
       });

       if (!member) return null;
       return project;
    } catch {
        return null;
    }
}