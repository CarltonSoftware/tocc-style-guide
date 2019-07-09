import React from 'react';
import connect from '../connect';
import { BrowserRouter } from 'react-router-dom';
import NavBar from './NavBar';
import { NavLink } from 'react-router-dom';
import 'bulma';
import * as EVENTS from '../events';
const elements = require('toccstyles').elements;

class Page extends React.Component {
  getElementLinks() {
    return Object.keys(elements).map((e, i) => {
      return (
        <div className="column is-3" key={ i }>
          <p>
            <strong>{ e.charAt(0).toUpperCase() + e.slice(1) + 's' }</strong>
          </p>
          <ul className="oc-list">
          { 
            elements[e].map((j, k) => {
              return (
                <li key={ k }>
                  <NavLink to={ { pathname: '/' + e + '/' + j.name } }>{ j.short }</NavLink>
                </li>
              );
            })
          }
          </ul>
        </div>    
      );
    });
  }
  
  render() {
    return (
      <BrowserRouter>
        <NavBar />
        { this.props.Tabs.state === EVENTS.GET_CURRENTUSER_START && <div className="container" style={ { minHeight: '70vh', paddingTop: '2rem' } }><p>Please wait...</p></div> }
        { this.props.Tabs.state !== EVENTS.GET_CURRENTUSER_START && <div style={ { minHeight: '70vh', paddingTop: '2rem' } }>{ this.props.children }</div> }
        <footer className="footer" style={ { minHeight: '30vh' } }>
          <div className="container">
            <div className="columns">
              <div className="column is-3">
                <p>
                  <strong>TOCC Style Guide</strong> by <a href="https://www.originalcottages.co.uk" target="_blank" rel="noopener noreferrer">IT/Marketing</a>.
                </p>
              </div>
              { this.props.Tabs.state !== EVENTS.GET_CURRENTUSER_START && this.getElementLinks() }
            </div>
          </div>
        </footer>
      </BrowserRouter>
    );
  }
}

export default connect(Page);
