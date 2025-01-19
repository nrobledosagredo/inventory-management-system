"use client";

import React from "react";
import { Amplify } from "aws-amplify";

import "./globals.css";
import {
  Authenticator,
  Image,
  Text,
  View,
  useTheme,
} from "@aws-amplify/ui-react";

import "@aws-amplify/ui-react/styles.css";
import outputs from "@/amplify_outputs.json";
import { GroupsProvider } from "@/context/groups-context";

import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { LayoutBreadcrumb } from "@/components/layout-breadcrumb";
import { ThemeProvider } from "@/components/theme-provider";

Amplify.configure(outputs);

const Header = () => {
  const { tokens } = useTheme();
  return (
    <View textAlign="center" padding={tokens.space.large}>
      <Image alt="logo" src="/logo.svg" />
    </View>
  );
};

const Footer = () => {
  const { tokens } = useTheme();
  return (
    <View textAlign="center" padding={tokens.space.large}>
      <Text color={tokens.colors.neutral[80]}>&copy; All Rights Reserved</Text>
    </View>
  );
};

const components = { Header, Footer };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Authenticator components={components}>
            <GroupsProvider>
              <SidebarProvider>
                <AppSidebar />
                <SidebarInset>
                  <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    <LayoutBreadcrumb />
                  </header>
                  <main>{children}</main>
                </SidebarInset>
              </SidebarProvider>
            </GroupsProvider>
          </Authenticator>
        </ThemeProvider>
      </body>
    </html>
  );
}
