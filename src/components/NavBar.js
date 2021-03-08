import React from 'react';
import ToggleClassButton from './ToggleClassButton';
import { NavLink } from 'react-router-dom';
import connect from '../connect';
const elements = require('toccstyles').elements;
const marketingbrands = require('toccstyles').marketingbrands;

class NavBar extends React.Component {
  getElementLinks() {
    return Object.keys(elements).map((e, i) => {
      return (
        <div className="navbar-item has-dropdown is-hoverable" key={ i }>
          <a href="#" className="navbar-link">
            { e.charAt(0).toUpperCase() + e.slice(1) + 's' }
          </a>
          <div className="navbar-dropdown">
          {
            elements[e].map((j, k) => {
              return (
                <NavLink className="navbar-item" to={ { pathname: '/' + e + '/' + j.name } } key={ k }>{ j.short }</NavLink>
              );
            })
          }
          </div>
        </div>
      );
    });
  }

  render() {
    let selectedWebsite = this.props.Tabs.selectedMarketingBrand;
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
            <div className="navbar-start">
              <NavLink className="navbar-item" to={ { pathname: '/' } }>
                Home
              </NavLink>

              { this.getElementLinks() }

              <div className="navbar-item has-dropdown is-hoverable">
                <a href="#" className="navbar-link">
                  { this.props.Tabs.selectedMarketingBrand ? this.props.Tabs.selectedMarketingBrand.name : 'Vanilla'} Theme
                  { this.props.Tabs.selectedMarketingBrand ? ' (' + this.props.Tabs.selectedMarketingBrand.id + ')' : null}
                </a>

                <div className="navbar-dropdown">
                  <a href="#" onClick={ () => { this.props.selectMarketingBrand({ id: "vanilla", name: "Vanilla" }); } } className="navbar-item">Vanilla</a>
                  {
                    marketingbrands.filter((mb, j) => {
                      return [9, 7, 2, 13, 16, 17, 20, 14].indexOf(mb.id) < 0;
                    }).map((mb, i) => {
                      const selectMb = () => {
                        this.props.selectMarketingBrand(mb);
                      };
                      return (
                        <a key={i} href="#" onClick={ selectMb } className="navbar-item">{ mb.name } ({ mb.id })</a>
                      );
                    })
                  }
                </div>
              </div>
              <NavLink className="navbar-item" to={ { pathname: '/logos' } }>
                Logos
              </NavLink>
              <div className="navbar-item"><a href={ selectedWebsite.website } target="_blank" rel="noopener noreferrer">View website</a></div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default connect(NavBar);