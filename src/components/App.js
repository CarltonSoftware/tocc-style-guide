import React from 'react';
import { Switch, Route } from 'react-router-dom';
import connect from '../connect';
import NotFoundScreen from './screens/NotFound';
import LogoutScreen from './screens/Logout';
import ElementListScreen from './screens/ElementList';
import ElementScreen from './screens/Element';
import HomeScreen from './screens/Home';
import LogosScreen from './screens/Logos';
import Page from './Page';
import 'bulma';

class App extends React.Component {
  render() {
    return (
      <Page>
        <Switch>
          <Route exact path="/" component={ HomeScreen } />
          <Route exact path="/logos" component={ LogosScreen } />
          <Route exact path="/logout" component={ LogoutScreen } />
          <Route exact path="/:element" component={ ElementListScreen } />
          <Route exact path="/:element/:item" component={ ElementScreen } />
          <Route component={ NotFoundScreen } />
        </Switch>
      </Page>
    );
  }
}

export default connect(App);
