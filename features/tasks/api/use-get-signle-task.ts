import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query"
import { TaskStatusEnum } from "../type";

interface UseGetTaskProps {
  taskId: string;
}

export const useGetSignleTask = ({ taskId }: UseGetTaskProps) => {
  const query = useQuery({
    queryKey: ["task", taskId],
    queryFn: async () => {
      const respone = await client.api.tasks[":taskId"].$get({
        param: { taskId },
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