"use client";

import { useGetGroup } from "@/hooks/use-groups";
import { useGetItems } from "@/hooks/use-items";
import { Skeleton } from "@/components/ui/skeleton";
import { columns } from "@/app/[id]/columns";
import { DataTable } from "@/app/[id]/data-table";

export default function GroupPage({ params }: { params: { id: string } }) {
  const { group, loading: groupLoading } = useGetGroup(params.id);
  const { items, loading: itemsLoading } = useGetItems(params.id);
  const formattedItems = items.map((item) => ({
    ...item,
    groupId: params.id,
  }));

  return (
    <main className="p-4">
      {groupLoading ? (
        <div className="pb-4 space-y-3 mt-2">
          <Skeleton className="w-40 h-12" />
          <Skeleton className="w-96 h-6" />
        </div>
      ) : (
        <div className="pb-4">
          <h1 className="text-6xl font-bold">{group?.title}</h1>
          <p className="text-2xl text-muted-foreground">{group?.description}</p>
        </div>
      )}

      <DataTable
        columns={columns}
        data={formattedItems}
        loading={itemsLoading}
        groupId={params.id}
      />
    </main>
  );
}
