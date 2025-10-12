import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/rpc";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.members)[":memberId"]["$patch"],
  200
>;
type RequestType = InferRequestType<
  (typeof client.api.members)[":memberId"]["$patch"]
>;

export const useUpdateMember = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json, param }) => {
      const res = await client.api.members[":memberId"]["$patch"]({
        json,
        param,
      });
      if (!res.ok) throw new Error("Failed to update");
      return await res.json();
    },
    onSuccess: (res) => {
      toast.success("Update member successfully");
      queryClient.invalidateQueries({
        queryKey: ["members", res.data.$id],
      });
    },
    onError: () => {
      toast.error("Failed to update member...");
    },
  });
  return mutation;
};
