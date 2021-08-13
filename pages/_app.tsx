import React from "react";
import { AppProps } from "next/app";
import Head from "next/head";
import Router from "next/router";
import Admin from "layouts/Admin";
import NProgress from "nprogress";
import {
  ApolloClient,
  ApolloProvider,
  gql,
  InMemoryCache,
} from "@apollo/client";
import Cookies from "js-cookie";
import "antd/dist/antd.css";
import "nprogress/nprogress.css";
import "styles/bootstrap-grid.min.css";
import "styles/Global.css";

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

Router.events.on("routeChangeStart", (url) => {
  NProgress.start();
});
Router.events.on("routeChangeComplete", () => {
  NProgress.done();
});
Router.events.on("routeChangeError", () => {
  NProgress.done();
});

export default MyApp;
