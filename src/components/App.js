import React from 'react';
import { Switch, Route } from 'react-router-dom';
import connect from '../connect';
import NotFoundScreen from './NotFound';
import LogoutScreen from './Logout';
import Page from './Page';

class App extends React.Component {
  constructor(props) {
    super(props);
    props.whoAmi();
  }

  render() {
    return (
      <Page>
        <Switch>
          <Route exact path="/" render={ () => <p>Home screen.</p> } />
          <Route exact path="/logout" render={ () => <LogoutScreen /> } />
          <Route exact path="/oauth" render={ () => <p>Please wait...</p> } />
          <Route render={ () => <NotFoundScreen /> } />
        </Switch>
      </Page>
    );
  }
}

export default connect(App);
