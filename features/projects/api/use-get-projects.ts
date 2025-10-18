import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query"

interface UseGetProjectsOptions {
    workspaceId: string;
}

export const useGetProjects = ({ workspaceId }: UseGetProjectsOptions) => {
  const query = useQuery({
    queryKey: ["projects", workspaceId],
    queryFn: async () => {
      const respone = await client.api.projects.$get({
        query: { workspaceId },
      });

      if (!respone.ok) {
        throw new Error("Failed to fecth projects");
      }
      const { data } = await respone.json();

      return data;
    },
  });
  return query;
};