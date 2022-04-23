import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import client from "../apollo-client";
import { createContext, useState } from "react";
import { UserEntity } from "@entities";

export const AuthContext = createContext<{ authState: State<UserEntity> }>(null as any);
export const MenuContext = createContext<{ menuState: State<boolean> }>(null as any);

function MyApp({ Component, pageProps }: AppProps) {
  const authState = useState<UserEntity | null>(null);
  const menuState = useState<boolean>(false);
  return (
    <>
      <ApolloProvider client={client}>
        <AuthContext.Provider value={{ authState }}>
          <MenuContext.Provider value={{ menuState }}>
            <Component {...pageProps} />
          </MenuContext.Provider>
        </AuthContext.Provider>
      </ApolloProvider>
    </>
  );
}

export default MyApp;
