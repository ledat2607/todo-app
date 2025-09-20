"use client";

import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import { RiAddCircleFill} from "react-icons/ri"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { WorkspaceImage } from "@/features/workspaces/components/workspace-avatar";
export const WorkspaceSwitcher = () => {
  const { data: workspaces } = useGetWorkspace();

  console.log(workspaces);

  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase text-neutral-500">Workspaces</p>
        <RiAddCircleFill className="size-5 text-neutral-400 cursor-pointer hover:opacity-75 transition" />
      </div>
      <Select>
        <SelectTrigger className="w-full bg-neutral-200 font-medium p-1">
          <SelectValue placeholder="No workspace selected" />
        </SelectTrigger>
        <SelectContent>
          {workspaces?.documents.map((workspace) => (
            <SelectItem key={workspace.$id} value={workspace.$id}>
              <div className="flex justify-start items-center gap-3 font-medium p-2">
                <WorkspaceImage name={workspace.name} image={workspace.image} />
                <span>{workspace.name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
