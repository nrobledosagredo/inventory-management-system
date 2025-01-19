"use client";

import Link from "next/link";
import { useGroupsContext } from "@/context/groups-context";
import { PackagePlus } from "lucide-react";

import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { AddGroup } from "@/components/add-group";
import { GroupMenu } from "@/components/group-menu";

export function NavContent() {
  const { groups, loading } = useGroupsContext();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin w-8 h-8 border-4 border-secondary border-t-primary rounded-full"></div>
      </div>
    );
  }

  return (
    <SidebarGroup>
      <SidebarMenu>
        <SidebarMenuItem>
          {/* New group button */}
          <Dialog>
            <DialogTrigger asChild>
              <SidebarMenuButton>
                <PackagePlus />
                <span className="mb-0.5">New group</span>
              </SidebarMenuButton>
            </DialogTrigger>
            <AddGroup />
          </Dialog>

          {/* Groups list */}
          {groups.length > 0 && (
            <SidebarMenuSub>
              {groups.map((group, index) => (
                <SidebarMenuSubItem
                  key={group.id || index}
                  className="relative flex items-center justify-between"
                >
                  <Link href={`/${group.id}`} className="w-40 truncate">
                    <SidebarMenuSubButton asChild>
                      <span>{group.title}</span>
                    </SidebarMenuSubButton>
                  </Link>
                  <GroupMenu key={group.id} group={group} />
                </SidebarMenuSubItem>
              ))}
            </SidebarMenuSub>
          )}
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
