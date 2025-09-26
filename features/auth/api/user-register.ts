import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/rpc";
import { toast } from "sonner";

type ResponseType = InferResponseType<(typeof client.api.auth.register)["$post"]>;
type RequestType = InferRequestType<(typeof client.api.auth.register)["$post"]>;

export const userRegister = () => {

 const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const res = await client.api.auth.register["$post"]({ json });
      return await res.json();
    },
    onSuccess:()=>{
      toast.success("Register successfull");
      queryClient.invalidateQueries({ queryKey: ["current"] });
      queryClient.refetchQueries({ queryKey: ["current"] });
    }
  });
  return mutation;
};
