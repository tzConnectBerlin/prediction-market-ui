import { ApolloClient, InMemoryCache, split } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { HttpLink } from '@apollo/client/link/http';
import { getMainDefinition } from '@apollo/client/utilities';
import { persistCache, LocalForageWrapper } from 'apollo3-cache-persist';
import localForage from 'localforage';

const httpLink = new HttpLink({
  uri: 'https://bigly.newby.org/graphql', // use https for secure endpoint
});

const wsLink = new WebSocketLink({
  uri: 'ws://localhost:5001/graphql', // use wss for a secure endpoint
  options: {
    reconnect: true,
  },
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
  },
  wsLink,
  httpLink,
);

const cache = new InMemoryCache();
const storage = new LocalForageWrapper(localForage);

persistCache({
  cache,
  storage,
  trigger: 'write',
});

export const graphqlClient = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
  connectToDevTools: true,
});
