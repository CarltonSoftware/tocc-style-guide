import React from 'react';
import connect from '../connect';

class Logout extends React.Component {
  constructor(props) {
    super(props);
    props.logOut();
  }

  render() {
    return (
      <div className="LogoutScreen">
        You have been logged out.
      </div>
    );
  }
}

export default connect(Logout);