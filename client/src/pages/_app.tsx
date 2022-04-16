import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache, split } from "@apollo/client";
import client from "../apollo-client";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </>
  );
}

export default MyApp;
