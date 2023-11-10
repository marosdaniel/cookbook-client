import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import { CssBaseline, ThemeProvider } from '@mui/material';

import App from './App';
import theme from './theme/';
import { persistor, store } from './store';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
const client = new ApolloClient({
  uri: process.env.REACT_APP_SERVER_URI,
  cache: new InMemoryCache(),
});

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider theme={theme}>
            <CssBaseline />

            <App />
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </ApolloProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
