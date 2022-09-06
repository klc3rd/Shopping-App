import "../styles/globals.scss";
import type { AppProps } from "next/app";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";

import CartContextProvider from "../components/page/cart/context";

import PageContainer from "../components/page/container";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

// Setup apolloclient for provider
const client = new ApolloClient({
  uri: "/api/graphql",
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <SessionProvider session={session}>
        <CartContextProvider>
          <Head>
            <title>Shopping App</title>
          </Head>
          <PageContainer>
            <Component {...pageProps} />
          </PageContainer>
        </CartContextProvider>
      </SessionProvider>
    </ApolloProvider>
  );
}

export default MyApp;
