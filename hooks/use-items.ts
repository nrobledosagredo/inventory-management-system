import { useEffect, useState } from "react";
import type { Schema } from "@/amplify/data/resource";
import {
  createItem,
  deleteItem,
  deleteItems,
  getItems,
  updateItem,
} from "@/services/item-service";

export const useGetItems = (groupId?: string) => {
  const [items, setItems] = useState<Array<Schema["Item"]["type"]>>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (groupId) {
      setLoading(true);
      const subscription = getItems(groupId).subscribe({
        next: (data) => {
          setItems([...data.items]);
          setLoading(false);
        },
        error: (err) => {
          console.error("Error observing items:", err);
          setLoading(false);
        },
      });

      return () => subscription.unsubscribe();
    } else {
      setLoading(false);
    }
  }, [groupId]);

  return { items, loading };
};

export function useCreateItem() {
  return createItem;
}

export function useDeleteItem() {
  return deleteItem;
}

export function useDeleteItems() {
  return deleteItems;
}

export function useUpdateItem() {
  return updateItem;
}
