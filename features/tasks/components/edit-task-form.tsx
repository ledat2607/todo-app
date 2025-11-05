"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DottedSeparator } from "@/components/dotted-separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, PencilIcon, Trash } from "lucide-react";

import { cn } from "@/lib/utils";
import { createTaskSchema } from "../schemas";
import { Task, TaskStatusEnum } from "../type";
import { DatePicker } from "@/components/data-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MemberImage } from "@/features/members/components/member-avatar";
import { ProjectAvatar } from "@/features/projects/components/project-avatar";
import { Textarea } from "@/components/ui/textarea";
import { useUpdateTask } from "../api/use-update-task";

interface UpdateTaskFormProps {
  onCancel?: () => void;
  projectOptions: { id: string; name: string; imageUrl: string }[];
  memberOptions: { id: string; name: string }[];
  initialValues: Task;
}

export const EditTaskForm = ({
  onCancel,
  projectOptions,
  memberOptions,
  initialValues,
}: UpdateTaskFormProps) => {
  const { mutate, isPending } = useUpdateTask();

  type CreateTaskFormValues = z.infer<typeof createTaskSchema>;

  const form = useForm<CreateTaskFormValues>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      ...initialValues,
      dueDate: initialValues?.dueDate
        ? new Date(initialValues.dueDate)
        : undefined,
    },
  });
  const onSubmit = (values: CreateTaskFormValues) => {
    mutate(
      { json: values, param: { taskId: initialValues?.$id as string } },
      {
        onSuccess: () => {
          form.reset();
          onCancel?.();
        },
      }
    );
  };
  return (
    <Card className="w-full h-full border-none shadow-none">
      <CardHeader className="flex p-7">
        <CardTitle className="text-xl font-bold">Update task</CardTitle>
      </CardHeader>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="p-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {/* Task Name Field */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Task name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your task name....." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Due Date Field */}
            <FormField
              control={form.control}
              name="dueDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Due date</FormLabel>
                  <FormControl>
                    <DatePicker
                      value={field.value ? new Date(field.value) : undefined}
                      onChange={(date) => field.onChange(date)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Assignee Field */}
            <FormField
              control={form.control}
              name="assigneeId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Assignee</FormLabel>
                  <Select
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select assignee" />
                      </SelectTrigger>
                    </FormControl>
                    <FormMessage />
                    <SelectContent>
                      {memberOptions.map((member) => (
                        <SelectItem
                          key={member.id}
                          value={member.id}
                          className="cursor-pointer"
                        >
                          <div className="flex gap-2 items-center">
                            {" "}
                            <MemberImage
                              className="size-6"
                              name={member.name}
                            />
                            {member.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            {/* Status Field */}
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <FormMessage />
                    <SelectContent>
                      <SelectItem value={"Select Status"}>
                        Select Status
                      </SelectItem>
                      <SelectItem value={TaskStatusEnum.BACKLOG}>
                        Back Log
                      </SelectItem>
                      <SelectItem value={TaskStatusEnum.TODO}>To Do</SelectItem>
                      <SelectItem value={TaskStatusEnum.IN_PROGRESS}>
                        In Progress
                      </SelectItem>
                      <SelectItem value={TaskStatusEnum.DONE}>Done</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            {/* Project Field */}
            <FormField
              control={form.control}
              name="projectId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project</FormLabel>
                  <Select
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select project" />
                      </SelectTrigger>
                    </FormControl>
                    <FormMessage />
                    <SelectContent>
                      {projectOptions.map((project) => (
                        <SelectItem
                          key={project.id}
                          value={project.id}
                          className="cursor-pointer"
                        >
                          <div className="flex gap-2 items-center">
                            <ProjectAvatar
                              className="size-6"
                              name={project.name}
                              image={project.imageUrl}
                            />
                            {project.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            {/* Description Field */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Task description</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={5}
                      placeholder="Enter your task description....."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DottedSeparator className="my-6" />
            <div className="flex items-center justify-end gap-4">
              <Button disabled={isPending} type="submit">
                {isPending ? (
                  <>
                    <Loader2 className="animate-spin" />
                    Updating....
                  </>
                ) : (
                  <>
                    <PencilIcon />
                    Update task
                  </>
                )}
              </Button>
              <Button
                disabled={isPending}
                type="button"
                variant={"destructive"}
                className={cn(!onCancel && "invisible text-white")}
                onClick={onCancel}
              >
                <Trash />
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
