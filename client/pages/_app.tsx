import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import client from "../apollo-client";
import { createContext, useState } from "react";
import { UserEntity } from "@entities";

export const AuthContext = createContext<{ authState: State<UserEntity> }>(null as any);

function MyApp({ Component, pageProps }: AppProps) {
  const authState = useState<UserEntity | null>(null);
  return (
    <>
      <ApolloProvider client={client}>
        <AuthContext.Provider value={{ authState }}>
          <Component {...pageProps} />
        </AuthContext.Provider>
      </ApolloProvider>
    </>
  );
}

export default MyApp;
