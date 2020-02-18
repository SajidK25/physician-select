import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { onError } from "apollo-link-error";
import { createHttpLink } from "apollo-link-http";
import { prod_endpoint, dev_endpoint } from "./config";

const cache = new InMemoryCache();
// const endpoint = prod_endpoint;
//const endpoint = dev_endpoint;

const endpoint =
  process.env.NODE_ENV === "development" ? dev_endpoint : prod_endpoint;

const httpLink = createHttpLink({
  uri: endpoint,
  credentials: "include"
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.log(`[Network error]: $networkError`);
});

const link = errorLink.concat(httpLink);

const client = new ApolloClient({
  link,
  cache,
  resolvers: {}
});

const data = {
  sleepType: "",
  user: {
    __typename: "User",
    firstName: "",
    lastName: "",
    zipCode: "",
    email: "",
    gender: ""
  },
  networkStatus: {
    __typename: "Network Status",
    isConnected: false
  }
};

cache.writeData({ data });

// cache.onResetStore(() => cache.writeData({ data }));

export default client;
