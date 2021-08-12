/*!

=========================================================
* NextJS Material Dashboard v1.1.0 based on Material Dashboard React v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/nextjs-material-dashboard
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/nextjs-material-dashboard/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import App, { AppProps } from "next/app";
import Head from "next/head";
import Router from "next/router";
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
import PageChange from "components/PageChange/PageChange";

import { useGetCurrentUserQuery, User } from "../src/generated/graphql";

Router.events.on("routeChangeStart", (url) => {
  console.log(`Loading: ${url}`);
  document.body.classList.add("body-page-transition");
  ReactDOM.render(
    <PageChange path={url} />,

    document.getElementById("page-transition")
  );
});
Router.events.on("routeChangeComplete", () => {
  const el = document.getElementById("page-transition");
  if (el) {
    ReactDOM.unmountComponentAtNode(el);
  }

  document.body.classList.remove("body-page-transition");
});
Router.events.on("routeChangeError", () => {
  const el = document.getElementById("page-transition");
  if (el) {
    ReactDOM.unmountComponentAtNode(el);
  }

  document.body.classList.remove("body-page-transition");
});

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
