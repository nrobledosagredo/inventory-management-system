import React, { createContext, useContext } from "react";

import { useGetGroups } from "@/hooks/use-groups";

const GroupsContext = createContext<GroupsContextType | undefined>(undefined);

export function GroupsProvider({ children }: { children: React.ReactNode }) {
  const { groups, loading } = useGetGroups();

  return (
    <GroupsContext.Provider value={{ groups, loading }}>
      {children}
    </GroupsContext.Provider>
  );
}

export const useGroupsContext = () => {
  const context = useContext(GroupsContext);
  if (!context) {
    throw new Error("useGroupsContext must be used within a GroupsProvider");
  }
  return context;
};
