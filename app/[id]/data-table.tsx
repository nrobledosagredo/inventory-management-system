"use client";

import * as React from "react";
import { useState } from "react";
import {
  ColumnFiltersState,
  ColumnSizingState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Plus, SlidersHorizontal, Trash } from "lucide-react";

import { useCreateItem, useDeleteItems } from "@/hooks/use-items";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ColumnResizer } from "@/app/[id]/column-resizer";

export function DataTable<TData, TValue>({
  columns,
  data,
  groupId,
  loading,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [colSizing, setColSizing] = useState<ColumnSizingState>({});
  const table = useReactTable({
    data,
    columns,
    enableColumnResizing: true,
    columnResizeMode: "onChange",
    getPaginationRowModel: getPaginationRowModel(),
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    onColumnSizingChange: setColSizing,
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      columnSizing: colSizing,
    },
  });

  const isMobile = useIsMobile();
  const createItem = useCreateItem();
  const deleteItems = useDeleteItems();
  const [itemTitle, setItemTitle] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [itemQuantity, setItemQuantity] = useState(1);

  const handleCreateItem = () => {
    if (itemTitle.trim()) {
      createItem(itemTitle, itemDescription, itemQuantity, groupId);
      setItemTitle("");
      setItemDescription("");
      setItemQuantity(1);
    }
  };

  const handleDeleteItems = () => {
    // Extract the ids of the selected rows, casting row.original to Item
    const selectedIds = table.getFilteredSelectedRowModel().rows.map(
      (row) => (row.original as Item).id // Assuming Item has an `id` field
    );

    // Call deleteItems function with the selected ids
    if (selectedIds.length > 0) {
      deleteItems(selectedIds);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between sm:">
        <div className="flex items-center py-4 space-x-2">
          {/* Filter */}
          <Input
            placeholder="Filter items..."
            value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("title")?.setFilterValue(event.target.value)
            }
            className="w-[425px]"
          />

          {/* Column visibility */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="outline" className="ml-auto">
                <SlidersHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="space-x-2">
          {/* Create item */}
          <Dialog>
            <DialogTrigger asChild>
              {isMobile ? (
                <Button variant="default" size="icon">
                  <Plus />
                </Button>
              ) : (
                <Button className="w-32">
                  <Plus />
                  <span>New item</span>
                </Button>
              )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create a new item</DialogTitle>
                <DialogDescription>
                  Enter information for your new item below.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-2">
                <Label htmlFor="itemTitle">Title</Label>
                <Input
                  id="itemTitle"
                  value={itemTitle}
                  onChange={(e) => setItemTitle(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="itemDescription">Description</Label>
                <Input
                  id="itemDescription"
                  value={itemDescription}
                  onChange={(e) => setItemDescription(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="itemQuantity">Quantity</Label>
                <Input
                  id="itemQuantity"
                  type="number"
                  value={itemQuantity}
                  onChange={(e) => setItemQuantity(parseInt(e.target.value))}
                />
              </div>

              <DialogFooter>
                <DialogClose asChild>
                  <Button onClick={handleCreateItem}>Create</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Add Delete Button */}
          {isMobile ? (
            <Button
              variant="destructive"
              disabled={table.getFilteredSelectedRowModel().rows.length == 0}
              onClick={handleDeleteItems}
              size="icon"
            >
              <Trash />
            </Button>
          ) : (
            <Button
              variant="destructive"
              disabled={table.getFilteredSelectedRowModel().rows.length == 0}
              onClick={handleDeleteItems}
            >
              <Trash />
              Delete item(s)
            </Button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="relative"
                      style={{
                        width: header.getSize(),
                      }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      <ColumnResizer<TData> header={header} />
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {loading ? (
              // Loading state
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24">
                  <div className="mx-auto animate-spin w-6 h-6 border-4 border-secondary border-t-primary rounded-full" />
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              // Render rows when data is available
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      style={{
                        width: cell.column.getSize(),
                        minWidth: cell.column.columnDef.minSize,
                      }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              // No results message
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between">
        {/* Row count */}
        <div className="flex-1 text-sm text-muted-foreground pl-2 pb-2">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
