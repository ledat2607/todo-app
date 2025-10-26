import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useGetMembers } from "@/features/members/api/use-get-members";
import { useGetProjects } from "@/features/projects/api/use-get-projects";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { FolderIcon, ListCheckIcon, User2Icon } from "lucide-react";
import { TaskStatusEnum } from "../type";
import { useTaskFilter } from "../hooks/use-task-filter";
import { ProjectAvatar } from "@/features/projects/components/project-avatar";
import { DatePicker } from "@/components/data-picker";

interface UseGetTaskProps {
  hideProjectFilter?: boolean;
}

export const DataFilter = ({ hideProjectFilter }: UseGetTaskProps) => {
  const workspaceId = useWorkspaceId();
  const { data: project, isLoading: isLoadingProjects } = useGetProjects({
    workspaceId,
  });
  const { data: members, isLoading: isLoadingMembers } = useGetMembers({
    workspaceId,
  });

  const isLoading = isLoadingProjects || isLoadingMembers;

  const projectsOptions = project?.documents.map((project) => ({
    value: project.$id,
    label: project.name,
    imageURl: project.imageUrl,
  }));

  const membersOptions = members?.documents.map((member) => ({
    value: member.$id,
    label: member.name,
  }));

  const [{ status, projectId, assigneeId, dueDate, search }, setFilters] =
    useTaskFilter();

  const onStatusChange = (value: string) => {
    if (value === "all") {
      setFilters({ status: null });
    } else {
      setFilters({ status: value as TaskStatusEnum });
    }
  };

  const onAssigneeChange = (value: string) => {
    if (value === "all") {
      setFilters({ assigneeId: null });
    } else {
      setFilters({ assigneeId: value });
    }
  };

   const onProjectChange = (value: string) => {
    if (value === "all") {
      setFilters({ projectId: null });
    } else {
      setFilters({ projectId: value });
    }
  };

  if (isLoading) return null;

  return (
    <div className="flex flex-col lg:flex-row gap-2">
      {/*Status */}
      <Select
        defaultValue={status ?? undefined}
        onValueChange={(value) => {
          onStatusChange(value);
        }}
      >
        <SelectTrigger className="w-full lg:w-fit h-8">
          <div className="flex items-center pr-2">
            <ListCheckIcon className="size-4 mr-2" />
            <SelectValue placeholder="All status" />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <Separator />
          <SelectItem value={TaskStatusEnum.BACKLOG}>Back log</SelectItem>
          <SelectItem value={TaskStatusEnum.TODO}>To do</SelectItem>
          <SelectItem value={TaskStatusEnum.IN_PROGRESS}>
            In progress
          </SelectItem>
          <SelectItem value={TaskStatusEnum.DONE}>Done</SelectItem>
          <SelectItem value={TaskStatusEnum.IN_REVIEW}>In review</SelectItem>
        </SelectContent>
      </Select>

      {/*Assignees */}
      <Select
        defaultValue={assigneeId ?? undefined}
        onValueChange={(value) => {
          onAssigneeChange(value);
        }}
      >
        <SelectTrigger className="w-full lg:w-fit h-8">
          <div className="flex items-center pr-2">
            <User2Icon className="size-4 mr-2" />
            <SelectValue placeholder="All assignees" />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Assignees</SelectItem>
          <Separator />
          {membersOptions?.map((member) => (
            <SelectItem key={member.value} value={member.value}>
              {member.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/*Projects */}
      <Select
        defaultValue={projectId ?? undefined}
        onValueChange={(value) => {
          onProjectChange(value);
        }}
      >
        <SelectTrigger className="w-full lg:w-fit h-8 overflow-hidden">
          <div className="flex items-center pr-2">
            <FolderIcon className="size-4 mr-2" />
            <SelectValue placeholder="All projects" />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All projects</SelectItem>
          <Separator />
          {projectsOptions?.map((project) => (
            <SelectItem key={project.value} value={project.value}>
              <div className="flex items-center gap-2">
                {" "}
                <ProjectAvatar name={project.label} image={project.imageURl} />
                {project.label}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/*Date picker */}
      <DatePicker
        placeholder="Due Date"
        className="h-8 w-full lg:w-auto"
        value={dueDate ? new Date(dueDate) : undefined}
        onChange={(date)=>{
          setFilters({ dueDate: date ? date.toISOString() : null });
        }}
      />
    </div>
  );
};
