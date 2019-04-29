import React from 'react';
import CenteredHero from '../CenteredHero';
import connect from '../../connect';

class Home extends React.Component {
  render() {
    return (
      <CenteredHero size="is-large">
        <h1 className="title">
          <p>Home Screen</p>
        </h1>
      </CenteredHero>
    )
  }
}

export default connect(Home);