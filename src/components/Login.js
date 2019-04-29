import React from 'react';
import Page from './Page';
import CenteredHero from './CenteredHero';

class Login extends React.Component {
  render() {
    return (
      <Page>
        <CenteredHero size="is-large">
          <h1 className="title">
            You are not logged in
          </h1>
        </CenteredHero>
      </Page>
    );
  }
}

export default Login;
