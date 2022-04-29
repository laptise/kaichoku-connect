import { ApolloClient, HttpLink, InMemoryCache, split } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { setContext } from "@apollo/client/link/context";
import { Urls } from "./env";

const cache = new InMemoryCache();

/**ウェブソケットリンク*/
const wsLink =
  typeof window !== "undefined"
    ? new GraphQLWsLink(
        createClient({
          url: Urls.subscriptEndPoint,
        })
      )
    : null;

/**httpリンク*/
const httpLink = new HttpLink({
  uri: typeof window !== "undefined" ? Urls.queryEndPoint : process.env.NEXT_PUBLIC_SSR_GQL,
});

/**認証情報の付与*/
const authLink = setContext((_, { headers }) => {
  const token = typeof window !== "undefined" ? sessionStorage.getItem("access_token") : "";
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

const ssrClient = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_SSR_GQL,
  cache: new InMemoryCache(),
});

export default client;
