import { ApolloClient, HttpLink, InMemoryCache, split } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "apollo-link-ws";
import { OperationDefinitionNode } from "graphql";

const SUBSCRIPTIONS_ENDPOINT = `${process.env.NEXT_PUBLIC_BACKEND_WS}/graphql`;
const QUERY_ENDPOINT = `${process.env.NEXT_PUBLIC_BACKEND_URL}/graphql`;

const cache = new InMemoryCache();
const wsLink =
  typeof window !== "undefined"
    ? new WebSocketLink({
        // if you instantiate in the server, the error will be thrown
        uri: SUBSCRIPTIONS_ENDPOINT,
        options: {
          reconnect: true,
        },
      })
    : null;
const httpLink = new HttpLink({
  uri: QUERY_ENDPOINT,
});
const link =
  typeof window !== "undefined"
    ? split(
        //only create the split in the browser
        // split based on operation type
        ({ query }) => {
          const { kind, operation } = getMainDefinition(query) as OperationDefinitionNode;
          return kind === "OperationDefinition" && operation === "subscription";
        },
        wsLink as any,
        httpLink
      )
    : httpLink;
const client = new ApolloClient({
  link,
  cache,
});

export default client;
