import { getCurrent } from "@/features/auth/actions";
import { getWorkspace } from "@/features/workspaces/actions";
import { UpdateWorkspaceForm } from "@/features/workspaces/components/update-workspace-form";
import { redirect } from "next/navigation";


interface WorkspaceSettingPageProps {
  params: {
    workspaceId: string;
  };
}

const WorkspaceIdSettingPage = async ({
  params,
}: WorkspaceSettingPageProps) => {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  const workspaceId = await params;

  const initialValues = await getWorkspace({
    workspaceId: workspaceId.workspaceId,
  });
  if(!initialValues){
    redirect(`/workspaces/${workspaceId.workspaceId}`);
  }
  return (
    <div>
      <UpdateWorkspaceForm initialValues={initialValues} />
    </div>
  );
};

export default WorkspaceIdSettingPage;
