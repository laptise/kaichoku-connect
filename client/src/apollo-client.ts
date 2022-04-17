import { ApolloClient, HttpLink, InMemoryCache, split } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
const SUBSCRIPTIONS_ENDPOINT = `${process.env.NEXT_PUBLIC_BACKEND_WS}/graphql`;
const QUERY_ENDPOINT = `${process.env.NEXT_PUBLIC_BACKEND_URL}/graphql`;

const cache = new InMemoryCache();
const wsLink =
  typeof window !== "undefined"
    ? new GraphQLWsLink(
        createClient({
          url: SUBSCRIPTIONS_ENDPOINT,
        })
      )
    : null;

const httpLink = new HttpLink({
  uri: QUERY_ENDPOINT,
});

const splitLink =
  typeof window !== "undefined" && wsLink
    ? split(
        ({ query }) => {
          const definition = getMainDefinition(query);
          return definition.kind === "OperationDefinition" && definition.operation === "subscription";
        },
        wsLink,
        httpLink
      )
    : httpLink;

const client = new ApolloClient({
  link: splitLink,
  cache,
});

export default client;
