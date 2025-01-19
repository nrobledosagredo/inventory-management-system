"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useGroupsContext } from "@/context/groups-context";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export function LayoutBreadcrumb() {
  const pathname = usePathname();
  const { groups, loading } = useGroupsContext();

  // Create a map of group IDs to group titles
  const groupsMap = React.useMemo(
    () =>
      groups.reduce((acc, group) => {
        acc[group.id] = group.title ?? "";
        return acc;
      }, {} as Record<string, string>),
    [groups]
  );

  // Split the pathname into segments and remove empty strings
  const segments = pathname.split("/").filter(Boolean);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {/* Initial breadcrumb */}
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/">My groups</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {/* Separator */}
        {segments.length > 0 && <BreadcrumbSeparator />}

        {/* Group breadcrumb */}
        {segments.map((segment, index) => {
          const isLast = index === segments.length - 1;
          const href = `/${segments.slice(0, index + 1).join("/")}`;
          const displayName = groupsMap[segment] || decodeURIComponent(segment);

          return (
            <React.Fragment key={index}>
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{displayName}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={href}>{displayName}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator />}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
