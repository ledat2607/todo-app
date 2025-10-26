import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query"
import { TaskStatusEnum } from "../type";

interface UseGetTaskProps {
  workspaceId: string;
  projectId?: string | null;
  status?: TaskStatusEnum | null;
  assigneeId?: string | null;
  dueDate?: string | null;
  search?: string | null;
}

export const useGetTasks = ({ workspaceId, projectId, status, assigneeId, dueDate, search }: UseGetTaskProps) => {
  const query = useQuery({
    queryKey: [
      "tasks",
      workspaceId,
      projectId,
      status,
      assigneeId,
      dueDate,
      search,
    ],
    queryFn: async () => {
      const respone = await client.api.tasks.$get({
        query: {
          workspaceId,
          projectId: projectId ?? undefined,
          status: status ?? undefined,
          assigneeId: assigneeId ?? undefined,
          dueDate: dueDate ?? undefined,
          search: search ?? undefined,
        },
      });

      if (!respone.ok) {
        throw new Error("Failed to fecth tasks");
      }
      const { data } = await respone.json();

      return data;
    },
  });
  return query;
};