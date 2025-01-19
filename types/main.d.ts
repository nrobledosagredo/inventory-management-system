import type { Schema } from "@/amplify/data/resource";
import { ColumnDef } from "@tanstack/react-table";

declare global {
  interface Group {
    id: string;
    title?: string | null;
    description?: string | null;
  }

  interface Item {
    id: string;
    title?: string | null;
    description?: string | null;
    quantity?: number | null;
    groupId: string | null;
  }

  interface GroupsContextType {
    groups: Array<Schema["Group"]["type"]>;
    loading: boolean;
  }

  interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    groupId: string;
    loading: boolean;
  }
}

export {};
