import { ApolloClient, HttpLink, InMemoryCache, split } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { setContext } from "@apollo/client/link/context";
const SUBSCRIPTIONS_ENDPOINT = `${process.env.NEXT_PUBLIC_BACKEND_WS}/graphql`;
const QUERY_ENDPOINT = `${process.env.NEXT_PUBLIC_BACKEND_URL}/graphql`;

const cache = new InMemoryCache();

/**ウェブソケットリンク*/
const wsLink =
  typeof window !== "undefined"
    ? new GraphQLWsLink(
        createClient({
          url: SUBSCRIPTIONS_ENDPOINT,
        })
      )
    : null;

/**httpリンク*/
const httpLink = new HttpLink({
  uri: QUERY_ENDPOINT,
});

/**認証情報の付与*/
const authLink = setContext((_, { headers }) => {
  const token = sessionStorage.getItem("access_token");
  //ヘッダーにマージ
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

/**実行環境とクエリ内容によってエンドポイントを切替*/
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

/**Apollo Client instance */
const client = new ApolloClient({
  link: authLink.concat(splitLink),
  cache,
});

export const ssrClient = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_SSR_GQL,
  cache: new InMemoryCache(),
});

export default client;
