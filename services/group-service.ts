// services/group-service.ts
import type { Schema } from "@/amplify/data/resource";
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>();

export function getGroups() {
  return client.models.Group.observeQuery();
}

export async function getGroup(id: string) {
  return client.models.Group.get({ id });
}

export async function createGroup(title: string, description: string) {
  return await client.models.Group.create({ title, description });
}

export async function deleteGroup(id: string) {
  const { data } = await client.models.Item.list({
    filter: { groupId: { eq: id } },
  });
  await Promise.all(
    data.map((item) => client.models.Item.delete({ id: item.id }))
  );
  return await client.models.Group.delete({ id });
}

export async function updateGroup(
  id: string,
  updates: Partial<{ title: string; description: string }>
) {
  return await client.models.Group.update({ id, ...updates });
}
