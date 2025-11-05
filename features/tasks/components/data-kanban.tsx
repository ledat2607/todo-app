import { useState } from "react";
import { Task, TaskStatusEnum } from "../type";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "@hello-pangea/dnd";
import { KanbanColumnHeader } from "./kanban-column-header";

interface DataKanbanProps {
  data: Task[];
}
const boards: TaskStatusEnum[] = [
  TaskStatusEnum.BACKLOG,
  TaskStatusEnum.TODO,
  TaskStatusEnum.DONE,
  TaskStatusEnum.IN_PROGRESS,
  TaskStatusEnum.IN_REVIEW,
];

type TaskState = {
  [key in TaskStatusEnum]: Task[];
};


export const DataKanban = ({ data }: DataKanbanProps) => {
  const [tasks,setTasks] = useState<TaskState>(()=>{

    const initialTaks: TaskState = {
      [TaskStatusEnum.BACKLOG]: [],
      [TaskStatusEnum.TODO]: [],
      [TaskStatusEnum.DONE]: [],
      [TaskStatusEnum.IN_PROGRESS]: [],
      [TaskStatusEnum.IN_REVIEW]: [],
    };

    data.forEach((task) => {
      initialTaks[task.status].push(task);
    });

    Object.keys(initialTaks).forEach((status)=>{
      initialTaks[status as TaskStatusEnum].sort(
        (a, b) => (a.position as any) - (b.position as any)
      );
    })
    return initialTaks;
  })
  return (
    <DragDropContext onDragEnd={() => {}}>
      <div className="flex overflow-x-auto">
        {boards.map((board) => {
          return (
            <div key={board} className="flex-1 mx-2 bg-muted p-1.5 w-[200px]">
              <KanbanColumnHeader
                board={board}
                taskCount={tasks[board].length}
              />
            </div>
          );
        })}
      </div>
    </DragDropContext>
  );
};
