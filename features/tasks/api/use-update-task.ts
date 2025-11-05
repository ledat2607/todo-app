import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/rpc";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.tasks)[":taskId"]["$patch"]
>;
type RequestType = InferRequestType<
  (typeof client.api.tasks)[":taskId"]["$patch"]
>;

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json, param }) => {
      const res = await client.api.tasks[":taskId"]["$patch"]({
        json,
        param,
      });
      if (!res.ok) {
        throw new Error("Failed to update");
      }
      return await res.json();
    },
    onSuccess: (res) => {
      if ("data" in res) {
        toast.success("Update successful");
        queryClient.invalidateQueries({ queryKey: ["tasks"] });
        queryClient.invalidateQueries({ queryKey: ["task", res.data.$id] });
      } else {
        toast.error(res.error || "Failed to update task...");
      }
    },
    onError: () => {
      toast.error("Failed to update task...");
    },
  });
  return mutation;
};
