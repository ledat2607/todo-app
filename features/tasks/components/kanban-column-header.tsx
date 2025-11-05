import { snakeCaseToTitleCase } from "@/lib/utils";
import { TaskStatusEnum } from "../type";
import { ReactNode } from "react";
import { CircleCheckIcon, CircleDashedIcon, CircleDotDashedIcon, CircleDotIcon, CircleIcon, PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCreateTaskModal } from "../hooks/use-create-task";

interface KanbanColumnHeaderProps {
  board: TaskStatusEnum;
  taskCount: number;
}

const statusIcon: Record<TaskStatusEnum, ReactNode> = {
  [TaskStatusEnum.BACKLOG]: (
    <CircleDashedIcon className="size-[18px] text-pink-400" />
  ),
  [TaskStatusEnum.TODO]: <CircleIcon className="size-[18px] text-green-400" />,
  [TaskStatusEnum.IN_PROGRESS]: (
    <CircleDotDashedIcon className="size-[18px] text-yellow-400" />
  ),
  [TaskStatusEnum.IN_REVIEW]: (
    <CircleDotIcon className="size-[18px] text-blue-400" />
  ),
  [TaskStatusEnum.DONE]: (
    <CircleCheckIcon className="size-[18px] text-emerald-400" />
  ),
};

export const KanbanColumnHeader = ({
  board,
  taskCount,
}: KanbanColumnHeaderProps) => {
  const icon = statusIcon[board];
  const { open } = useCreateTaskModal();
  return (
    <div className="px-2 py-1 flex items-center justify-between">
      <div className="flex items-center gap-x-2">
        {icon}
        <h2 className="text-sm font-medium">{snakeCaseToTitleCase(board)}</h2>
        <div className="size-5 flex items-center justify-center rounded-md bg-neutral-200 text-xs text-neutral-700 font-medium">
          {taskCount}
        </div>
      </div>
      <Button
        variant={"outline"}
        onClick={open}
        size={"icon"}
        className="size-8"
      >
        <PlusIcon className="size-4 text-neutral-700" />
      </Button>
    </div>
  );
};