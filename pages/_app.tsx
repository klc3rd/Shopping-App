import "../styles/globals.scss";
import type { AppProps } from "next/app";
import Head from "next/head";

import PageContainer from "../components/page/container";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

// Setup apolloclient for provider
const client = new ApolloClient({
  uri: "/api/graphql",
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Head>
        <title>Shopping App</title>
      </Head>
      <PageContainer>
        <Component {...pageProps} />
      </PageContainer>
    </ApolloProvider>
  );
}

export default MyApp;
