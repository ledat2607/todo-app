'use client'

import {ColumnDef} from "@tanstack/react-table"
import { Task } from "../type";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, MoreVertical } from "lucide-react";
import { ProjectAvatar } from "@/features/projects/components/project-avatar";
import { MemberImage } from "@/features/members/components/member-avatar";
import { TaskDate } from "./task-date";
import { Badge } from "@/components/ui/badge";
import { snakeCaseToTitleCase } from "@/lib/utils";
import { TaskActions } from "@/components/task-actions";

export const columns: ColumnDef<Task>[] = [
  //task
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="sort"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Task name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const name = row.original.name;

      return <p className="line-clamp-1">{name}</p>;
    },
  },

  //project
  {
    accessorKey: "project",
    header: ({ column }) => {
      return (
        <Button
          variant="sort"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Project name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const project = row.original.project;

      return (
        <div className="flex items-center gap-x-2 text-sm font-medium">
          <ProjectAvatar
            className="size-6"
            name={project.name}
            image={project.imageUrl}
          />
          <p className="line-clamp-1">{project.name}</p>
        </div>
      );
    },
  },

  //assignee
  {
    accessorKey: "assignee",
    header: ({ column }) => {
      return (
        <Button
          variant="sort"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Assignee
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const assignee = row.original.assignee;

      return (
        <div className="flex items-center gap-x-2 text-sm font-medium">
          <MemberImage
            fallbackClassName="text-xs"
            className="size-6"
            name={assignee.name}
          />
          <p className="line-clamp-1">{assignee.name}</p>
        </div>
      );
    },
  },

  //dueDate
  {
    accessorKey: "dueDate",
    header: ({ column }) => {
      return (
        <Button
          variant="sort"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Due Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const dueDate = row.original.dueDate;

      return (
        <div className="flex items-center gap-x-2 text-sm font-medium">
          <TaskDate value={dueDate} />
        </div>
      );
    },
  },

  //status
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="sort"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const status = row.original.status;

      return (
        <div className="flex items-center gap-x-2 text-sm font-medium">
          <Badge variant={status} className="w-20 !text-center">
            {snakeCaseToTitleCase(status)}
          </Badge>
        </div>
      );
    },
  },

  //actions
  {
    id:'actions',
    cell:({row})=>{
      const id = row.original.$id;
      const projectId = row.original.projectId;
      return (
        <TaskActions id={id} projectId={projectId}>
          <Button variant={'sort'}>
            <MoreVertical className="size-4" />
          </Button>
        </TaskActions>
      );
    }
  }
];
