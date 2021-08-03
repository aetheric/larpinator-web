import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    useQuery,
    gql
} from "@apollo/client";

const client = new ApolloClient({
    uri: 'http://localhost:3000/graphql',
    cache: new InMemoryCache()
});

const GET_USER_BY_ID = gql`
    query getUser {
        getUserById(id :1) {
            id
            email
        }
    }
`;

// function test() {
//     const { loading, error, data } = useQuery(GET_USER_BY_ID);
//
//     if (loading) return <p>Loading...</p>;
//     if (error) return <p>Error :(</p>;
//     console.log(data);
//
//     return data.getUser.map(({ id, email }) => (
//         <div key={id}>
//             <p>
//                 {id}: {email}
//             </p>
//         </div>
//     ));
// }

function App() {
  return (
      <ApolloProvider client={client}>
        <div className="App">
          <header className="App-header">

            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.tsx</code> and save to reload.
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
        </div>
      </ApolloProvider>
  );
}

export default App;
