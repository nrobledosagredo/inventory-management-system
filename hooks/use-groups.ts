import { useEffect, useState } from "react";
import type { Schema } from "@/amplify/data/resource";
import {
  createGroup,
  deleteGroup,
  getGroup,
  getGroups,
  updateGroup,
} from "@/services/group-service";

export function useGetGroups() {
  const [groups, setGroups] = useState<Array<Schema["Group"]["type"]>>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    const subscription = getGroups().subscribe({
      next: (data) => {
        setGroups([...data.items]);
        setLoading(false);
      },
      error: (err) => {
        console.error("Error observing groups:", err);
        setLoading(false);
      },
    });

    return () => subscription.unsubscribe();
  }, []);

  return { groups, loading };
}

export function useGetGroup(groupId: string) {
  const [group, setGroup] = useState<{
    title: string | null;
    description: string | null;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGroup = async () => {
      setLoading(true);
      try {
        const response = await getGroup(groupId);
        setGroup(response?.data || null);
      } finally {
        setLoading(false);
      }
    };

    fetchGroup();
  }, [groupId]);

  return { group, loading };
}

export function useCreateGroup() {
  return createGroup;
}

export function useDeleteGroup() {
  return deleteGroup;
}

export function useUpdateGroup() {
  return updateGroup;
}
