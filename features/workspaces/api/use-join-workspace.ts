import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { client } from "@/lib/rpc";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.workspaces)[":workspaceId"]["join"][":code"]["$post"],
  200
>;
type RequestType = InferRequestType<
  (typeof client.api.workspaces)[":workspaceId"]["join"][":code"]["$post"]
>;

export const useJoinWorkspace = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param }) => {
      console.log("🚀 Calling API:", param);

      const res = await client.api.workspaces[":workspaceId"]["join"][":code"][
        "$post"
      ]({
        param,
      });

      if (!res.ok) {
        throw new Error("Failed to join workspace");
      }

      const data = await res.json();
      console.log("✅ Joined workspace:", data);
      return data;
    },
    onSuccess: async (res) => {
      toast.success("Joined workspace successfully!");
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["workspaces"] }),
        queryClient.invalidateQueries({
          queryKey: ["workspace", res.data.$id],
        }),
      ]);
      return res;
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return mutation;
};
