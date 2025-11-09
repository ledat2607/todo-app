import { useCallback, useEffect, useState } from "react";
import { Task, TaskStatusEnum } from "../type";

import {
  DragDropContext,
  Draggable,
  Droppable,
  type DropResult,
} from "@hello-pangea/dnd";
import { KanbanColumnHeader } from "./kanban-column-header";
import { KanbanCard } from "./kanban-card";

type TaskState = {
  [key in TaskStatusEnum]: Task[];
};

interface DatakanbanProps {
  data: Task[];
  onChange: (
    task: { $id: string; status: TaskStatusEnum; position: number }[]
  ) => void;
}

const boards: TaskStatusEnum[] = [
  TaskStatusEnum.BACKLOG,
  TaskStatusEnum.TODO,
  TaskStatusEnum.IN_PROGRESS,
  TaskStatusEnum.IN_REVIEW,
  TaskStatusEnum.DONE,
];

export const DataKanban = ({ data, onChange }: DatakanbanProps) => {
  const [tasks, setTasks] = useState<TaskState>(() => {
    const initialTasks: TaskState = {
      [TaskStatusEnum.BACKLOG]: [],
      [TaskStatusEnum.DONE]: [],
      [TaskStatusEnum.TODO]: [],
      [TaskStatusEnum.IN_PROGRESS]: [],
      [TaskStatusEnum.IN_REVIEW]: [],
    };

    data.forEach((task) => {
      initialTasks[task.status].push(task);
    });

    Object.keys(initialTasks).forEach((status) => {
      initialTasks[status as TaskStatusEnum].sort(
        (a, b) => a.position - b.position
      );
    });
    return initialTasks;
  });

  useEffect(() => {
    const newTask: TaskState = {
      [TaskStatusEnum.BACKLOG]: [],
      [TaskStatusEnum.DONE]: [],
      [TaskStatusEnum.TODO]: [],
      [TaskStatusEnum.IN_PROGRESS]: [],
      [TaskStatusEnum.IN_REVIEW]: [],
    };

    data.forEach((task) => {
      newTask[task.status].push(task);
    });

    Object.keys(newTask).forEach((status) => {
      newTask[status as TaskStatusEnum].sort((a, b) => a.position - b.position);
    });

    setTasks(newTask);
  }, [data]);

  const onDrapEnd = useCallback(
    (result: DropResult) => {
      if (!result.destination) return;

      const { source, destination } = result;

      const sourceStatus = source.droppableId as TaskStatusEnum;
      const desStatus = destination.droppableId as TaskStatusEnum;

      let updatePayload: {
        $id: string;
        status: TaskStatusEnum;
        position: number;
      }[] = [];

      setTasks((prevTasks) => {
        const newTasks = { ...prevTasks };

        const sourceColumn = [...newTasks[sourceStatus]];
        const [movedTask] = sourceColumn.splice(source.index, 1);

        if (!movedTask) {
          console.error("No task found");
          return prevTasks;
        }

        //create a new task project
        const updateMovedTask =
          sourceStatus !== desStatus
            ? { ...movedTask, status: desStatus }
            : movedTask;
        //update source column
        newTasks[sourceStatus] = sourceColumn;

        //add the task to destination column
        const desColumn = [...newTasks[desStatus]];
        desColumn.splice(destination.index, 0, updateMovedTask);

        newTasks[desStatus] = desColumn;

        //Prepare minial update payload
        updatePayload = [];

        //Always update the moved task
        updatePayload.push({
          $id: updateMovedTask.$id,
          status: desStatus,
          position: Math.min((destination.index + 1) * 1000, 1_000_000),
        });

        newTasks[desStatus].forEach((task, index) => {
          if (task && task.$id !== updateMovedTask.$id) {
            const newPosition = Math.min((index + 1) * 1000, 1_000_000);

            if (task.position !== newPosition) {
              updatePayload.push({
                $id: task.$id,
                status: desStatus,
                position: newPosition,
              });
            }
          }
        });
        if (sourceStatus !== desStatus) {
          newTasks[sourceStatus].forEach((task, index) => {
            if (task) {
              const newPosition = Math.min((index + 1) * 1000, 1_000_000);
              if (task.position !== newPosition) {
                updatePayload.push({
                  $id: task.$id,
                  status: sourceStatus,
                  position: newPosition,
                });
              }
            }
          });
        }
        return newTasks;
      });
      onChange(updatePayload);
    },
    [onChange]
  );

  return (
    <DragDropContext onDragEnd={onDrapEnd}>
      <div className="flex overflow-x-auto">
        {boards.map((board) => {
          return (
            <div
              key={board}
              className="flex-1 mx-2 bg-muted p-1.5 rounded-md min-w-[200px]"
            >
              <KanbanColumnHeader
                board={board}
                taskCount={tasks[board].length}
              />
              <Droppable droppableId={board}>
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="min-h-[200px] py-1.5"
                  >
                    {tasks[board].map((task, index) => (
                      <Draggable
                        key={task.$id}
                        draggableId={task.$id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            {...provided.dragHandleProps}
                            {...provided.draggableProps}
                            ref={provided.innerRef}
                          >
                            <KanbanCard task={task} />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          );
        })}
      </div>
    </DragDropContext>
  );
};
