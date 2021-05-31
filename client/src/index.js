import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import thunk from "redux-thunk";

import reducers from "./reducers";
import App from "./App";

const client = new ApolloClient({
  uri: "http://localhost:5000/recipes/beer/graphql",
  cache: new InMemoryCache(),
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <App />
    </Provider>
  </ApolloProvider>,
  document.getElementById("root")
);
