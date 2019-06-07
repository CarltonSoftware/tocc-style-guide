import React from 'react';
import { NavLink } from 'react-router-dom';
const elements = require('toccstyles').elements;

export default (props) => {
  if (!elements[props.element]) {
    return null;
  }

  return (
    <aside className="menu">
      <ul className="menu-list">
        { 
          elements[props.element].map((e, i) => {
            return (
              <li key={i}><NavLink to={ { pathname: '/' + props.element + '/' + e.name } }>{ e.name.charAt(0).toUpperCase() + e.name.slice(1) }</NavLink></li>
            );
          })
        }
      </ul>
    </aside>
  );
}