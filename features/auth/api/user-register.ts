import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/rpc";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type ResponseType = InferResponseType<(typeof client.api.auth.register)["$post"]>;
type RequestType = InferRequestType<(typeof client.api.auth.register)["$post"]>;

export const userRegister = () => {

 const queryClient = useQueryClient();
 const router = useRouter();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const res = await client.api.auth.register["$post"]({ json });
      return await res.json();
    },
    onSuccess:()=>{
      toast.success("Register successfull");
      router.push("/sign-in");
      queryClient.invalidateQueries({ queryKey: ["current"] });
      queryClient.refetchQueries({ queryKey: ["current"] });
    }
  });
  return mutation;
};
