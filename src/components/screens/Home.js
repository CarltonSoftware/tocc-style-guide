import React from 'react';
import connect from '../../connect';

class Home extends React.Component {
  render() {
    return (
      <div className="container HomeScreen">
        <p>Home Screen</p>
      </div>
    );
  }
}

export default connect(Home);