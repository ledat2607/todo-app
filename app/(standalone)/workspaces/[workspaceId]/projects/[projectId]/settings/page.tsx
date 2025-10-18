import { getCurrent } from "@/features/auth/actions";
import { UpdateProjectForm } from "@/features/projects/components/update-project-form";
import { getProjects } from "@/features/projects/queries";
import { redirect } from "next/navigation";

interface ProjectSettingPageProps {
  params: {
    projectId: string;
  };
}

const ProjectSettingPage = async ({ params }: ProjectSettingPageProps) => {
    const { projectId } = await params;
    const user = await getCurrent();

    if (!user) {
        redirect("/sign-in");
    }
    const initialValues = await getProjects({ projectId });

    if(!initialValues) {
      throw new Error("Project not found");
    }

    return <div className="w-full lg:max-w-xl">
        <UpdateProjectForm initialValues={initialValues} />
    </div>;
}
 
export default ProjectSettingPage;