import { ApolloLink } from "apollo-link";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { setContext } from "apollo-link-context";

const cache = new InMemoryCache();

const httpLink = new HttpLink({
  uri:
    process.env.NODE_ENV === "production"
      ? "/api/v1/graphql"
      : "http://localhost:5000/api/v1/graphql",
});

const authLink = setContext((_, { headers, ...rest }) => {
  const context = {
    ...rest,
    headers: {
      ...headers,
      Authorization: `bearer ${localStorage.getItem("token")}`,
    },
  };
  return context;
});

const errorLink = onError(({ graphQLErrors, networkError, operation }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, path }) => {
      console.log("graphql error:" + message + path);
    });
  }
  if (networkError) {
    console.log("network error:" + networkError.message);
  }
});

const defaultClient = new ApolloClient({
  cache,
  link: ApolloLink.from([errorLink, authLink, httpLink]),
});

export default defaultClient;
