'use client'

import {ColumnDef} from "@tanstack/react-table"
import { Task } from "../type";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

export const columns: ColumnDef<Task>[] = [
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
  },
];
