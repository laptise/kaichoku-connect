import { ApolloClient, HttpLink, InMemoryCache, split } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { setContext } from "@apollo/client/link/context";
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

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = sessionStorage.getItem("access_token");
  // return the headers to the context so httpLink can read them
  console.log(token);
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
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
  link: authLink.concat(splitLink),
  cache,
});

export default client;
