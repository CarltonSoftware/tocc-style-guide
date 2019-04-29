import React from 'react';

export default (props) => {
  return (
    <section className={ "hero " + props.size }>
      <div className="hero-body">
        <div className="container has-text-centered">
          { props.children }
        </div>
      </div>
    </section>
  );
}