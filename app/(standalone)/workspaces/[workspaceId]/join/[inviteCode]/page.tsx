import { getCurrent } from "@/features/auth/actions";
import { GetWorkspaceInfo } from "@/features/workspaces/api/use-get-workspace-info";
import { JoinWoekspaceForm } from "@/features/workspaces/components/join-workspace";
import { redirect } from "next/navigation";

interface WorkspaceIdSettingPageProps {
  params: {
    workspaceId: string;
  };
}

const JoinWorkspacePage = async ({ params }: WorkspaceIdSettingPageProps) => {
   const { workspaceId } = await params; 
  
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  const workspace = await GetWorkspaceInfo({
    workspaceId: workspaceId,
  });

  if(!workspace){
    redirect("/")
  }

  return (
    <div className="w-full lg:max-w-xl">
      <JoinWoekspaceForm initialValues={workspace} />
    </div>
  );
};

export default JoinWorkspacePage;
