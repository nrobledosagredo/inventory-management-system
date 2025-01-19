"use client";

import { useAuthenticator } from "@aws-amplify/ui-react";
import { LogOut } from "lucide-react";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function NavFooter() {
  const { signOut } = useAuthenticator();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          onClick={signOut}
          className="text-destructive hover:text-destructive"
        >
          <LogOut />
          <span className="mb-0.5">Log out</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
