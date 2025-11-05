"use client";

//Icon
import { Loader2, PlusIcon } from "lucide-react";

import { DottedSeparator } from "@/components/dotted-separator";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { useCreateTaskModal } from "../hooks/use-create-task";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { useGetTasks } from "../api/use-get-task";
import { DataFilter } from "./data-filter";
import { useTaskFilter } from "../hooks/use-task-filter";
import { DataTable } from "./data-table";
import { columns } from "./colums";
import { DataKanban } from "./data-kanban";

export const TaskViewSwitcher = () => {
  const workspaceId = useWorkspaceId();

  const [{ status, projectId, assigneeId, dueDate, search }] = useTaskFilter();
  const { data: tasks, isLoading: isLoadingTasks } = useGetTasks({
    workspaceId,
    projectId,
    assigneeId,
    status,
    dueDate,
  });


  const { open } = useCreateTaskModal();

  return (
    <Tabs defaultValue="table" className="flex-1 w-full border rounded-2xl">
      <div className="h-full flex flex-col overflow-auto p-4">
        <div className="flex flex-col gap-y-2 lg:flex-row justify-between items-center">
          <TabsList className="w-full lg:w-auto gap-4">
            <TabsTrigger className="h-8 w-full lg:w-auto" value="table">
              Table
            </TabsTrigger>
            <TabsTrigger className="h-8 w-full lg:w-auto" value="kanban">
              Kanban
            </TabsTrigger>
            <TabsTrigger className="h-8 w-full lg:w-auto" value="calendar">
              Calendar
            </TabsTrigger>
          </TabsList>
          <Button onClick={open} size={"sm"} className="w-full lg:w-auto">
            <PlusIcon />
            New
          </Button>
        </div>
        <DottedSeparator className="my-7" />
        <DataFilter />
        <DottedSeparator className="my-7" />
        {isLoadingTasks ? (
          <div className="w-full border rounded-lg h-[200px] flex flex-col items-center justify-center">
            <Loader2 className="animate-spin" />
          </div>
        ) : (
          <>
            <TabsContent value="table" className="mt-0">
              <DataTable columns={columns} data={tasks?.documents ?? []} />
            </TabsContent>
            <TabsContent value="kanban" className="mt-0">
              <DataKanban data={tasks?.documents ?? []} />
            </TabsContent>
            <TabsContent value="calendar" className="mt-0">
              Data Calendar
            </TabsContent>
          </>
        )}
      </div>
    </Tabs>
  );
};
