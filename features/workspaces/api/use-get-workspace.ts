import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query"

export const useGetWorkspace = ()=>{
    const query = useQuery({
      queryKey: ["workspaces"],
      queryFn: async () => {
        const respone = await client.api.workspaces.$get();

        if (!respone.ok) {
          throw new Error("Failed to fecth workspaces");
        }
        const { data } = await respone.json();
        return data;
      },
    });
    return query;
}