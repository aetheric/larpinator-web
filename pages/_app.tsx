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
import React, { Component } from "react";
import ReactDOM from "react-dom";
import App, { AppProps } from "next/app";
import Head from "next/head";
import Router from "next/router";
import Admin from "layouts/Admin";
import { createStore } from "redux";
import {
  ApolloClient,
  ApolloProvider,
  gql,
  InMemoryCache,
} from "@apollo/client";
import Cookies from "js-cookie";

const token = Cookies.get("token");

const client = new ApolloClient({
  uri: "http://localhost:3000/graphql",
  cache: new InMemoryCache(),
  headers: {
    authorization: token ? `Bearer ${token}` : "",
  },
});

import PageChange from "components/PageChange/PageChange";

import "assets/css/nextjs-material-dashboard.css?v=1.1.0";
import { useGetCurrentUserQuery } from "../src/generated/graphql";

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

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    return {
      pageProps: {
        ...(Component.getInitialProps
          ? await Component.getInitialProps(ctx)
          : {}),
      },
    };
  }

  render() {
    const { Component, router, pageProps } = this.props;
    return (
      <React.Fragment>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <title>Larpinator APP</title>
        </Head>
        <ApolloProvider client={client}>
          {router.pathname.includes("login") ? (
            <Component {...pageProps} />
          ) : (
            <Admin>
              <Component {...pageProps} />
            </Admin>
          )}
        </ApolloProvider>
      </React.Fragment>
    );
  }
}

export default MyApp;
