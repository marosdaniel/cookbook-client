import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

let uri = process.env.REACT_APP_SERVER_URI;

if (process.env.NODE_ENV === 'development') {
  uri = process.env.REACT_APP_DEV_SERVER_URI ?? '';
}

const httpLink = createHttpLink({ uri });

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
