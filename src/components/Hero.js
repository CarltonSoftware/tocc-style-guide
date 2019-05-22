import React from 'react';

export default (props) => {
  let bodyClass = ['container'];
  if (props.className) {
    bodyClass.push(props.className);
  }
  return (
    <section className={ "hero " + props.size }>
      <div className="hero-body">
        <div className={ bodyClass.join(' ') }>
          { props.children }
        </div>
      </div>
    </section>
  );
}