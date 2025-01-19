import { a, defineData, type ClientSchema } from "@aws-amplify/backend";

const schema = a.schema({
  Group: a
    .model({
      title: a.string(),
      description: a.string(),
    })
    .authorization((allow) => [allow.owner()]),

  Item: a
    .model({
      title: a.string(),
      description: a.string(),
      quantity: a.integer(),
      groupId: a.string(),
    })
    .authorization((allow) => [allow.owner()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool",
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});
