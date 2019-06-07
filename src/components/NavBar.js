import React from 'react';
import ToggleClassButton from './ToggleClassButton';
import { NavLink } from 'react-router-dom';
import connect from '../connect';
import { client } from 'plato-js-client';
import * as EVENTS from '../events';
const elements = require('toccstyles').elements;

class NavBar extends React.Component {
  getElementLinks() {
    return Object.keys(elements).map((e, i) => {
      return (
        <NavLink className="navbar-item" to={ { pathname: '/' + e } } key={ i }>
          { e.charAt(0).toUpperCase() + e.slice(1) + 's' }
        </NavLink>
      );
    })
  }

  whoAmi() {
    client.getInstance().whoAmi();
  }

  render() {
    const links = this.getElementLinks();

    return (
      <nav className="navbar">
        <div className="container">
          <div className="navbar-brand">
            <a className="navbar-item" href="/">
              <img src={ process.env.PUBLIC_URL + '/img/logo.gif' } alt="The Original Cottage Company" />
            </a>

            <ToggleClassButton className="navbar-burger burger" target="mainnavsection">
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </ToggleClassButton>
          </div>

          <div id="mainnavsection" className="navbar-menu">
            { this.props.Tabs.state !== EVENTS.LOGOUT && <div className="navbar-start">
              <NavLink className="navbar-item" to={ { pathname: '/' } }>
                Home
              </NavLink>

              { links.length > 0 && <div className="navbar-item has-dropdown is-hoverable">
                <a href="#" className="navbar-link">
                  Elements
                </a>

                <div className="navbar-dropdown">
                  { links }
                </div>
              </div> }

              <div className="navbar-item has-dropdown is-hoverable">
                <a href="#" className="navbar-link">
                  { this.props.Tabs.selectedMarketingBrand ? this.props.Tabs.selectedMarketingBrand.name : 'Vanilla'} Theme
                  { this.props.Tabs.selectedMarketingBrand ? ' (' + this.props.Tabs.selectedMarketingBrand.id + ')' : null}
                </a>

                { this.props.Tabs.MarketingBrand && <div className="navbar-dropdown">
                  <a href="#" onClick={ () => { this.props.selectMarketingBrand(this.props.Tabs.user, null); } } className="navbar-item">Vanilla</a>
                  { 
                    this.props.Tabs.MarketingBrand.map((mb, i) => {
                      const selectMb = () => {
                        this.props.selectMarketingBrand(this.props.Tabs.user, mb);
                      };
                      return (
                        <a key={i} href="#" onClick={ selectMb } className="navbar-item">{ mb.name } ({ mb.id })</a>
                      );
                    })
                  }
                </div> }
              </div>
            </div> }

            <div className="navbar-end">
              { this.props.Tabs.user && <div className="navbar-item">{ this.props.Tabs.user.getFullName() }</div> }
              { this.props.Tabs.state === EVENTS.LOGOUT && <div className="navbar-item">You have been logged out</div> }
              <div className="navbar-item">
                <div className="buttons">
                  { !this.props.Tabs.user && this.props.Tabs.state !== EVENTS.GET_CURRENTUSER_START && <button className="button is-light" onClick={ this.whoAmi.bind(this) }>Login</button> }
                  { this.props.Tabs.user && <NavLink className="button is-light" to={ { pathname: '/logout' } }>Log out</NavLink> }
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default connect(NavBar);