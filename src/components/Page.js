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
        { this.props.Tabs.state === EVENTS.GET_CURRENTUSER_START && <div className="container" style={ { minHeight: '70vh', paddingTop: '2rem' } }><p>Please wait...</p></div> }
        { this.props.Tabs.state !== EVENTS.GET_CURRENTUSER_START && <div style={ { minHeight: '70vh', paddingTop: '2rem' } }>{ this.props.children }</div> }
        <footer className="footer" style={ { minHeight: '30vh' } }>
         	<div className="container">
      		  <div className="content">
      		    <p>
      		      <strong>TOCC Style Guide</strong> by <a href="https://www.originalcottages.co.uk" target="_blank" rel="noopener noreferrer">IT/Marketing</a>.
      		    </p>
      		  </div>
          </div>
        </footer>
      </BrowserRouter>
    );
  }
}

export default connect(Page);
