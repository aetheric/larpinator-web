import React from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from "@apollo/client";
import { Test } from "./test/Test";

import { Route, BrowserRouter, Switch } from "react-router-dom";
import { TestB } from "./test/TestB";

const client = new ApolloClient({
  uri: "http://localhost:3000/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <div className="App">
          <p>xxxx</p>
          <Switch>
            <Route exact path="/SubMenu1" component={Test} />
            <Route exact path="/SubMenu2" component={TestB} />
          </Switch>
        </div>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
