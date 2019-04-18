import React from 'react';
import connect from '../connect';

class Logout extends React.Component {
  constructor(props) {
    super(props);
    props.logOut();
  }

  render() {
    return (
      <div className="container">
        <div className="columns">
          <div className="column">
            You have been logged out.
          </div>
        </div>
      </div>
    );
  }
}

export default connect(Logout);