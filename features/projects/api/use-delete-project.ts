import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/rpc";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.projects)[":projectId"]["$delete"],
  200
>;
type RequestType = InferRequestType<
  (typeof client.api.projects)[":projectId"]["$delete"]
>;

export const useDeleteProject = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param }) => {
      const res = await client.api.projects[":projectId"]["$delete"]({
        param,
      });
      if (!res.ok) throw new Error("Failed to delete");
      return await res.json(); // { data: { $id: string } }
    },
    onSuccess: (res) => {
      if ("error" in res) {
        toast.error(res.error);
        return;
      }

      toast.success("Project deleted successfully");
      queryClient.invalidateQueries({
        queryKey: ["projects", res.data.$id],
      });
    },
    onError: () => {
      toast.error("Failed to delete project...");
    },
  });
  return mutation;
};
