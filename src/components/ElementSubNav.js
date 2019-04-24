import React from 'react';
import elements from '../elements.json';
import { NavLink } from 'react-router-dom';

export default (props) => {
  if (!elements[props.element]) {
    return null;
  }

  return (
    <div className="tabs">
      <ul>
        { 
          elements[props.element].map((e, i) => {
            return (
              <li key={i}><NavLink to={ { pathname: '/' + props.element + '/' + e.name } }>{ e.name.charAt(0).toUpperCase() + e.name.slice(1) }</NavLink></li>
            );
          })
        }
      </ul>
    </div>
  );
}