import React from 'react';
import Hero from './Hero';

export default (props) => {
  return (
    <Hero className='has-text-centered'>{ props.children }</Hero>
  );
}