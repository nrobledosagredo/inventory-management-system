"use client";

import * as React from "react";
import Link from "next/link";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { Boxes } from "lucide-react";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function NavHeader() {
  const { user } = useAuthenticator();
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <Link href="/">
          <SidebarMenuButton
            size="lg"
            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          >
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
              <Boxes className="text-primary size-4" />
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="text-primary truncate font-semibold">
                Inventory manager
              </span>
              <span className="truncate text-xs">
                {user?.signInDetails?.loginId}
              </span>
            </div>
          </SidebarMenuButton>
        </Link>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
