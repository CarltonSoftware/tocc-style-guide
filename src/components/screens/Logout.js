import React from 'react';
import connect from '../../connect';

class Logout extends React.Component {
  constructor(props) {
    super(props);
    props.logOut();
  }

  render() {
    return null;
  }
}

export default connect(Logout);