import { Hono } from "hono";
import { handle } from "hono/vercel";
import auth from "@/features/auth/server/route";
import workspace from "@/features/workspaces/server/route";
import member from "@/features/members/server/route";
import project from "@/features/projects/server/route";
import task from "@/features/tasks/server/route";

const app = new Hono().basePath("/api");
const routes = app
  .route("/auth", auth)
  .route("/workspaces", workspace)
  .route("/projects", project)
  .route("/members", member)
  .route("/tasks", task);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;
