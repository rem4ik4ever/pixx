import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: process.env.GQL_URL,
  cache: new InMemoryCache(),
  headers: {
    'Authorization': `Bearer ${process.env.CONTENTFUL_TOKEN}`
  }
});

export default client;
