import {parseAsString, parseAsStringEnum, useQueryStates} from "nuqs"
import { TaskStatusEnum } from "../type"

export const useTaskFilter = ()=>{
    return useQueryStates({
      projectId: parseAsString,
      status: parseAsStringEnum(Object.values(TaskStatusEnum)),
      assigneeId: parseAsString,
      search: parseAsString,
      dueDate: parseAsString,
    });
}