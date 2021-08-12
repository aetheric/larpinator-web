import React from "react";
import { AppProps } from "next/app";
import Head from "next/head";
import Admin from "layouts/Admin";
import {
  ApolloClient,
  ApolloProvider,
  gql,
  InMemoryCache,
} from "@apollo/client";
import Cookies from "js-cookie";
import "antd/dist/antd.css";

const token = Cookies.get("token");

const client = new ApolloClient({
  uri: "http://localhost:3000/graphql",
  cache: new InMemoryCache(),
  headers: {
    authorization: token ? `Bearer ${token}` : "",
  },
});

import { useGetCurrentUserQuery, User } from "../src/generated/graphql";

const GET_CURRENT_USER = gql`
  query getCurrentUser {
    getCurrentUser {
      id
      name
      email
      isActive
    }
  }
`;

type ContextProps = {
  currentUser: Partial<User> | undefined;
};

export const AuthContext = React.createContext<Partial<ContextProps>>({});

function MyApp({ Component, router, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <React.Fragment>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <title>Larpinator APP</title>
        </Head>

        <MyAppInner
          pageProps={pageProps}
          Component={Component}
          router={router}
        />
      </React.Fragment>
    </ApolloProvider>
  );
}

function MyAppInner({ Component, router, pageProps }: AppProps) {
  const { data } = useGetCurrentUserQuery();

  return (
    <AuthContext.Provider value={{ currentUser: data?.getCurrentUser }}>
      {router.pathname.includes("login") ? (
        <Component {...pageProps} />
      ) : (
        <Admin>
          <Component {...pageProps} />
        </Admin>
      )}
    </AuthContext.Provider>
  );
}

export default MyApp;
