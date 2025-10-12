import { getCurrent } from "@/features/auth/actions";
import { MemberList } from "@/features/workspaces/components/member-list";
import { redirect } from "next/navigation";

const WorkspaceIdMembersPage = async () => {
  const user = await getCurrent();
  if (!user) {
    return redirect("/");
  }
  return (
    <div className="w-full lg:max-w-xl">
      <MemberList userId={user.$id} />
    </div>
  );
};

export default WorkspaceIdMembersPage;
