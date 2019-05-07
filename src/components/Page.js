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
        { this.props.Tabs.state === EVENTS.GET_CURRENTUSER_START && <div className="container"><p>Please wait...</p></div> }
        { this.props.Tabs.state !== EVENTS.GET_CURRENTUSER_START && this.props.children }
        <footer className="footer">
         	<div className="container">
      		  <div className="content">
      		    <p>
      		      <strong>TOCC Style Guide</strong> by <a href="https://www.originalcottages.co.uk" target="_blank">IT/Marketing</a>.
      		    </p>
      		  </div>
          </div>
    		</footer>
      </BrowserRouter>
    );
  }
}

export default connect(Page);
