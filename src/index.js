import React from 'react';
import { createStore, compose, applyMiddleware } from 'redux';
import { BrowserRouter as Router } from 'react-router-dom';
import ReactDOM from 'react-dom';
import {
  ApolloClient,
  ApolloProvider,
  createNetworkInterface,
} from 'react-apollo';
import 'bootstrap/dist/css/bootstrap.css';

import config from './config';
import reducers from './reducers';
import routes from './Routes';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

const networkInterface = createNetworkInterface({
  uri: config.API_URI,
});

networkInterface.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {};  // Create the header object if needed.
    }
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('token');
    req.options.headers.authorization = token ? `Bearer ${token}` : null;
    next();
  }
}]);

const client = new ApolloClient({
  networkInterface,
});
const rootReducer = Object.assign({}, reducers, { apollo: client.reducer() });

const store = createStore(
  compose(
      applyMiddleware(client.middleware()),
      // If you are using the devToolsExtension, you can add it here also
      (typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined') ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
  )
);

ReactDOM.render(
  <ApolloProvider store={store} client={client}>
    <Router children={routes} />
  </ApolloProvider>,
  document.getElementById('root'));
registerServiceWorker();
