import 'react-app-polyfill/ie9';
import 'react-app-polyfill/stable';

import React from 'react';
import ReactDOM from 'react-dom';
import { client } from 'plato-js-client';
import { Provider } from 'react-redux'
import store from './store';
import App from './components/App';
import Login from './components/Login';

require('details-polyfill');

client.getInstance().setInstance({
  apiRoot: 'https://toccl.api.tabs-software.co.uk',
  apiPrefix: '/v2',
  oAuthRedirectUrl: window.location.protocol + '//' + window.location.hostname + ':' + window.location.port + '/oauth.html',
  clientId: '16_2jgop2ihc0sg0sgwccskk0c0804k4ogw40s44ccgs4c8g0wgw4'
});

if (window.location.hash && window.location.hash.length > 30) {
  // synchronously save the token to localStorage
  client.getInstance().oAuthCallback(window.location.hash);

  var l = window.location.protocol + '//' + window.location.hostname;
  if (window.location.port && window.location.port.length > 0) {
    l = l.concat(':' + window.location.port);
  }
  window.location = l;
}

ReactDOM.render(
  <Provider store={store()}>
    { !client.getInstance().token && <Login /> }
    { client.getInstance().token && <App /> }
  </Provider>,
  document.getElementById('root')
);