import { ApolloClient, HttpLink, InMemoryCache, split } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { setContext } from "@apollo/client/link/context";
import { Urls } from "./env";
import { isBrowser } from "./util";

const cache = new InMemoryCache({ addTypename: false });

/**ウェブソケットリンク*/
const wsLink = isBrowser()
  ? new GraphQLWsLink(
      createClient({
        url: Urls.subscriptEndPoint,
      })
    )
  : null;

/**httpリンク*/
const httpLink = new HttpLink({
  uri: isBrowser() ? Urls.queryEndPoint : "http://server:3018/graphql",
});

/**認証情報の付与*/
const authLink = setContext((_, { headers }) => {
  const token = isBrowser() ? sessionStorage.getItem("access_token") : "";
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
  isBrowser() && wsLink
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
  ssrMode: !isBrowser(),
  link: authLink.concat(splitLink),
  credentials: "include",
  cache,
});

export default client;
