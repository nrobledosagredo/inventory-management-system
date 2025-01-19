"use client";

import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";

import { useDeleteItem, useUpdateItem } from "@/hooks/use-items";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/table-input";

export const columns: ColumnDef<Item>[] = [
  // Checkbox column
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="m-1 mb-2"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="m-1 mb-2"
      />
    ),
    enableSorting: false,
    enableHiding: false,
    enableResizing: false,
    maxSize: 50,
  },

  // Title column
  {
    accessorKey: "title",
    header: "Title",
    enableResizing: true,
    cell: ({ row }) => {
      const updateItem = useUpdateItem();
      const [isEditing, setIsEditing] = useState(false);
      const [title, setTitle] = useState<string>(
        row.getValue("title") as string
      );

      const handleDoubleClick = () => setIsEditing(true);

      const handleBlur = () => {
        setIsEditing(false);
        if (title !== row.getValue("title")) {
          updateItem(row.original.id, { title });
        }
      };

      const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
          event.currentTarget.blur();
        }
      };

      return isEditing ? (
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      ) : (
        <span onDoubleClick={handleDoubleClick}>{title}</span>
      );
    },
  },

  // Description column
  {
    accessorKey: "description",
    header: "Description",
    enableResizing: true,
    cell: ({ row }) => {
      const updateItem = useUpdateItem();
      const [isEditing, setIsEditing] = useState(false);
      const [description, setDescription] = useState<string>(
        row.getValue("description") as string
      );

      const handleDoubleClick = () => setIsEditing(true);

      const handleBlur = () => {
        setIsEditing(false);
        if (description !== row.getValue("description")) {
          updateItem(row.original.id, { description });
        }
      };

      const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
          event.currentTarget.blur();
        }
      };

      return isEditing ? (
        <Input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      ) : (
        <span onDoubleClick={handleDoubleClick}>{description}</span>
      );
    },
  },

  // Quantity column
  {
    accessorKey: "quantity",
    header: "Quantity",
    enableResizing: false,
    maxSize: 10,

    cell: ({ row }) => {
      const updateItem = useUpdateItem();
      const [isEditing, setIsEditing] = useState(false);
      const [quantity, setQuantity] = useState<number>(
        row.getValue("quantity") as number
      );

      const handleDoubleClick = () => setIsEditing(true);

      const handleBlur = () => {
        setIsEditing(false);
        if (quantity !== row.getValue("quantity")) {
          updateItem(row.original.id, { quantity });
        }
      };

      const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
          event.currentTarget.blur();
        }
      };

      return isEditing ? (
        <Input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      ) : (
        <span onDoubleClick={handleDoubleClick}>{quantity}</span>
      );
    },
  },
];
