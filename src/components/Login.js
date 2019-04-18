import React from 'react';
import Page from './Page';

class Login extends React.Component {
  render() {
    return (
      <Page>
        <section className="hero is-large">
          <div className="hero-body">
            <div className="container has-text-centered">
              <h1 className="title">
                You are not logged in
              </h1>
            </div>
          </div>
        </section>
      </Page>
    );
  }
}

export default Login;
