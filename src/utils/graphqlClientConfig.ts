import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_SERVER_URI,
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('c_b_token');
  return {
    headers: {
      ...headers,
      authorization: token ?? '',
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
