import z from "zod";
import { TaskStatusEnum } from "./type";

export const createTaskSchema = z.object({
  name: z.string().min(1, "Task name is required"),
  status: z.nativeEnum(TaskStatusEnum),
  workspaceId: z.string().trim().min(1, "Required"),
  projectId: z.string().trim().min(1, "Required"),
  dueDate: z.coerce.date<Date>(),
  assigneeId: z.string().trim().min(1, "Required"),
  description: z.string().min(1, "Required").optional(),
});

