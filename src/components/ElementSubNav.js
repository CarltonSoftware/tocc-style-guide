import React from 'react';
import { NavLink } from 'react-router-dom';
const elements = require('toccstyles').elements;

export default (props) => {
  if (!elements[props.element]) {
    return null;
  }
  
  return (
    <aside className="menu">
      <h3>{ props.element.charAt(0).toUpperCase() + props.element.slice(1) }</h3>
      <ul className="menu-list">
        { 
          elements[props.element].map((e, i) => {
            return (
              <li key={i}><NavLink to={ { pathname: '/' + props.element + '/' + e.name } }>{ e.short }</NavLink></li>
            );
          })
        }
      </ul>
    </aside>
  );
}