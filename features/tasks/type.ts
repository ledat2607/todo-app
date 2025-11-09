import { Models } from "node-appwrite";

export enum TaskStatusEnum {
  BACKLOG = "BACKLOG",
  IN_PROGRESS = "IN_PROGRESS",
  IN_REVIEW = "IN_REVIEW",
  DONE = "DONE",
  TODO = "TODO",
}

export type Task = Models.Document & {
  name: string;
  status: TaskStatusEnum;
  assigneeId: string;
  workspaceId: string;
  projectId: string;
  position: number;
  dueDate: string;
};

