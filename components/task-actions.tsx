import { ExternalLinkIcon, FolderOpen, PencilIcon, Trash } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { useDeleteTask } from "@/features/tasks/api/use-delete-task";
import { useConfirm } from "@/hooks/use-confirm";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { useRouter } from "next/navigation";
import { useUpdateTaskModal } from "@/features/tasks/hooks/use-update-task-modal";

interface TaskActionProps {
  id: string;
  projectId: string;
  children: React.ReactNode;
}

export const TaskActions = ({ id, projectId, children }: TaskActionProps) => {
  const router = useRouter();
  const { open } = useUpdateTaskModal();
  const workspaceId = useWorkspaceId();

  const [ConfirmDialog, confirm] = useConfirm(
    "Delete task",
    "This action cannot undone",
    "destructive"
  );

  const { mutate, isPending } = useDeleteTask();

  const handleConfirmDeleteTask = async () => {
    const ok = await confirm();
    if (!ok) return;

    mutate({ param: { taskId: id } });
  };

  const openTask = ()=>{
    router.push(`/workspaces/${workspaceId}/tasks/${id}`);
  }
  const openProject = ()=>{
    router.push(`/workspaces/${workspaceId}/projects/${projectId}`);
  }
    return (
      <div className="flex justify-end">
        <ConfirmDialog />
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            {/*Details */}
            <DropdownMenuItem
              onClick={openTask}
              className="font-medium p-[10px] cursor-pointer"
            >
              <ExternalLinkIcon className="size-4 mr-2 stroke-2" />
              Task Details
            </DropdownMenuItem>

            {/*Edit */}
            <DropdownMenuItem
              onClick={() => open(id)}
              disabled={false}
              className="font-medium p-[10px] cursor-pointer"
            >
              <PencilIcon className="size-4 mr-2 stroke-2" />
              Task Update
            </DropdownMenuItem>

            {/*Open */}
            <DropdownMenuItem
              onClick={openProject}
              className="font-medium p-[10px] cursor-pointer"
            >
              <FolderOpen className="size-4 mr-2 stroke-2" />
              Open project
            </DropdownMenuItem>

            {/*Delete */}
            <DropdownMenuItem
              onClick={handleConfirmDeleteTask}
              disabled={isPending}
              className="font-medium p-[10px] text-amber-700 cursor-pointer"
            >
              <Trash className="size-4 mr-2 stroke-2" />
              Delete task
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
};