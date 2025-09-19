import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/rpc";

type ResponseType = InferResponseType<(typeof client.api.auth.login)["$post"]>;
type RequestType = InferRequestType<(typeof client.api.auth.login)["$post"]>;

export const userLogin = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const res = await client.api.auth.login["$post"]({ json });
      return await res.json();
    },
    onSuccess:()=>{
      queryClient.invalidateQueries({ queryKey: ["current"] });
      queryClient.refetchQueries({ queryKey: ["current"] });
    }
  });
  return mutation;
};
