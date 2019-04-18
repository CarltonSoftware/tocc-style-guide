import React from 'react';
import ReactDOM from 'react-dom';
import { client } from 'plato-js-client';
import { Provider } from 'react-redux'
import store from './store';
import App from './components/App';
import Login from './components/Login';

client.getInstance().setInstance({
  apiRoot: 'https://toccl.test.api.tabs-software.co.uk',
  apiPrefix: '/v2',
  oAuthRedirectUrl: window.location.protocol + '//' + window.location.hostname + ':' + window.location.port + '/oauth',
  clientId: '16_41n59rhkvnqc408400scg4soww4goo0koc8gksg8oggwwc44co',
});

if (window.location.hash) {
  // synchronously save the token to localStorage
  client.getInstance().oAuthCallback(window.location.hash);

  var l = window.location.protocol + '//' + window.location.hostname;
  if (window.location.port && window.location.port.length > 0) {
    l = l.concat(':' + window.location.port);
  }
  window.location = l;
}

if (!client.getInstance().token) {
  ReactDOM.render(
    <Provider store={store()}>
      <Login />
    </Provider>,
    document.getElementById('root')
  );
} else {
  ReactDOM.render(
    <Provider store={store()}>
      <App />
    </Provider>,
    document.getElementById('root')
  );
}