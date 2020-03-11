import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import { App } from "./App";
import client from "./withData";

const StartApp = () => (
  <Router>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </Router>
);

ReactDOM.render(<StartApp />, document.getElementById("root"));
