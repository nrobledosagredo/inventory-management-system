"use client";

import { useGroupsContext } from "@/context/groups-context";

import { GroupCard } from "@/components/group-card";

export default function App() {
  const { groups, loading } = useGroupsContext();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin w-8 h-8 border-4 border-secondary border-t-primary rounded-full"></div>
      </div>
    );
  }

  return (
    <main className="flex flex-1 flex-col gap-4 p-4">
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        {groups.map((group) => (
          <GroupCard key={group.id} group={group} />
        ))}
      </div>
    </main>
  );
}
