// components/group-menu.tsx
import { useRouter } from "next/navigation";
import { Archive, MoreHorizontal, Pencil, Trash } from "lucide-react";

import { useDeleteGroup } from "@/hooks/use-groups";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function GroupMenu({ group }: { group: Group }) {
  const deleteGroup = useDeleteGroup();
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0 absolute -right-4">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          <Pencil />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Archive />
          Archive
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-destructive hover:text-destructive"
          onClick={(e) => {
            e.stopPropagation();
            deleteGroup(group.id);
            if (window.location.pathname.includes(group.id)) {
              router.push("/");
            }
          }}
        >
          <Trash />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
