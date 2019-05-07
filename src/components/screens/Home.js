import React from 'react';
import connect from '../../connect';

class Home extends React.Component {
  render() {
    return (
      <section className="hero">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">
              The Original Cottage Company
            </h1>
            <h2 className="subtitle">
              Style Guide
            </h2>
            <p>This site is intended to be a store of the components used in TOCC web applications.</p>
            <p>
              You will be able to browse components by type and see the 
              marketing brand variances by selecting brand from the navigation bar above.
            </p>
          </div>
        </div>
      </section>
    )
  }
}

export default connect(Home);