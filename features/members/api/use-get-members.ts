import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

interface UseGetMembersProps {
  workspaceId: string;
}

export const useGetMembers = ({ workspaceId }: UseGetMembersProps) => {
  const query = useQuery({
    queryKey: ["members", workspaceId],
    queryFn: async () => {
      const respone = await client.api.members.$get({ query: { workspaceId } });

      if (!respone.ok) {
        throw new Error("Failed to fecth all members in workspaces");
      }
      const { data } = await respone.json();
      return data;
    },
  });
  return query;
};
