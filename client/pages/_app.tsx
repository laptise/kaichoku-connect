import { ApolloProvider } from "@apollo/client";
import { JWTPayload } from "@entities";
import type { AppProps } from "next/app";
import { createContext, useState } from "react";
import client from "../apollo-client";
import "../styles/globals.scss";

export const AuthContext = createContext<{ authState: State<JWTPayload | null> }>(null as any);
export const MenuContext = createContext<{ menuState: State<boolean> }>(null as any);

function MyApp({ Component, pageProps }: AppProps) {
  const authState = useState<JWTPayload | null>(null);
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
