import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import Cookies from "js-cookie";

const authLink = new ApolloLink((ops, fwd) => {
  const token = Cookies.get("token");

  ops.setContext({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return fwd(ops);
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([authLink, new HttpLink({ uri: "/graphql" })]),
});

export default client;
