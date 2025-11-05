import { Card, CardContent } from "@/components/ui/card";
import { useGetMembers } from "@/features/members/api/use-get-members";
import { useGetProjects } from "@/features/projects/api/use-get-projects";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { Loader } from "lucide-react";
import { CreateTaskForm } from "./create-task-form";
import { useGetTasks } from "../api/use-get-task";
import { useGetSignleTask } from "../api/use-get-signle-task";
import { EditTaskForm } from "./edit-task-form";
import { Task, TaskStatusEnum } from "../type";

interface EditTaskFormWrapperProps {
  onCancel: () => void;
  id: string;
}

export const EditTaskFormWrapper = ({ onCancel, id }: EditTaskFormWrapperProps) => {
  const workspaceId = useWorkspaceId();

  const { data: initialValues, isLoading: isLoadingTask } = useGetSignleTask({
    taskId: id,
  });
  const { data: projects, isLoading: isLoadingProjects } = useGetProjects({
    workspaceId,
  });
  const { data: members, isLoading: isLoadingMembers } = useGetMembers({
    workspaceId,
  });

  const projectOptions = projects?.documents.map((project) => ({
    id: project.$id,
    name: project.name,
    imageUrl: project.imageUrl,
  }));
  const memberOptions = members?.documents.map((member) => ({
    id: member.$id,
    name: member.name,
  }));

  const isLoading = isLoadingProjects || isLoadingMembers || isLoadingTask;

  if (isLoading) {
    return (
      <Card className="w-full h-[700px] border-none shadow-none">
        <CardContent className="flex items-center flex-col h-full justify-center">
          <Loader className="animate-spin" />
        </CardContent>
      </Card>
    );
  }

    if(!initialValues){
      return null;
    }
    const taskData: Task = {
      $id: initialValues.$id,
      $collectionId: initialValues.$collectionId,
      $databaseId: initialValues.$databaseId,
      $createdAt: initialValues.$createdAt,
      $updatedAt: initialValues.$updatedAt,
      $permissions: initialValues.$permissions,

      name: initialValues.project?.name ?? "",
      status: initialValues.status,
      assigneeId: initialValues.assignee?.$id ?? "",
      workspaceId: initialValues.project?.workspaceId ?? "",
      projectId: initialValues.project?.$id ?? "",
      position: initialValues.position,
      description: initialValues.description as any,
      dueDate: new Date().toISOString(),
    };
  return (
    <div>
      <EditTaskForm
        onCancel={onCancel}
        initialValues={taskData}
        projectOptions={projectOptions ?? []}
        memberOptions={memberOptions ?? []}
      />
    </div>
  );
};