"use client";

import { useGetProjects } from "@/features/projects/api/use-get-projects";
import { ProjectAvatar } from "@/features/projects/components/project-avatar";
import { useCreateProjectModal } from "@/features/projects/hook/use-create-project";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RiAddCircleFill } from "react-icons/ri";

const Projects = () => {
  const pathname = usePathname();

  const workspaceId = useWorkspaceId();

  const { open } = useCreateProjectModal();

  const { data } = useGetProjects({ workspaceId });
  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase text-neutral-500">Projects</p>
        <RiAddCircleFill
          onClick={open}
          className="size-5 text-neutral-400 cursor-pointer hover:opacity-75 transition"
        />
      </div>
      {data?.documents.map((project) => {
        const href = `/workspaces/${workspaceId}/projects/${project.$id}`;
        const isActive = pathname === href;

        return (
          <Link
            href={href}
            key={project.$id}
            className={`px-3 py-1 rounded-md  hover:bg-neutral-200 transition text-sm text-muted-foreground ${
              isActive
                ? "bg-neutral-400 font-medium text-white hover:text-blue-500"
                : "font-normal"
            }`}
          >
            <div className="flex items-center gap-2">
              {" "}
              <ProjectAvatar
                image={project.imageUrl}
                name={project.name}
                className="text-lg"
              />
              <span className="truncate">{project.name}</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Projects;
