import React from 'react';
import connect from '../connect';
import { BrowserRouter } from 'react-router-dom';
import NavBar from './NavBar';
import 'bulma';
import * as EVENTS from '../events';

class Page extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <NavBar />
        { this.props.Tabs.state === EVENTS.GET_CURRENTUSER_START && <p>Please wait...</p> }
        { this.props.Tabs.state !== EVENTS.GET_CURRENTUSER_START && this.props.children }
      </BrowserRouter>
    );
  }
}

export default connect(Page);
