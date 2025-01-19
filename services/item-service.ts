// services/item-service.ts
import { type Schema } from "@/amplify/data/resource";
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>();

export function getItems(groupId: string) {
  return client.models.Item.observeQuery({
    filter: {
      groupId: { eq: groupId },
    },
  });
}

export async function createItem(
  title: string,
  description: string,
  quantity: number,
  groupId: string
) {
  return await client.models.Item.create({
    title,
    description,
    quantity,
    groupId,
  });
}

export async function deleteItem(id: string) {
  return await client.models.Item.delete({ id });
}

export async function deleteItems(ids: string | string[]) {
  return await Promise.all(
    (Array.isArray(ids) ? ids : [ids]).map((id) =>
      client.models.Item.delete({ id })
    )
  );
}

export async function updateItem(
  id: string,
  updates: Partial<{ title: string; description: string; quantity: number }>
) {
  return await client.models.Item.update({ id, ...updates });
}
