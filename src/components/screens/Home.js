import React from 'react';
import connect from '../../connect';

class Home extends React.Component {
  render() {
    return (
      <section className="hero">
        <div className="hero-body">
          <div className="container">
            <div className="oc-content">
              <h1>
                The Original Cottage Company
                <small className="oc-subtitle">Style Guide</small>
              </h1>
              <p>This site is intended to be a store of the components used in TOCC web applications.</p>
              <p>
                You will be able to browse components by type and see the 
                marketing brand variances by selecting brand from the navigation bar above.
              </p>
            
              <h4>Globals</h4>
              <h5>Colours</h5>
            </div>
            <ul className="oc-list--inline">
              { 
                ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'darkgrey', 'lightgrey', 'reallylightgrey', 'almostwhite'].map((c, i) => {
                  return (
                    <li key={ i }>
                      <span className={ "oc-label oc-label--" + c }>Color { c }</span>
                    </li>
                  );
                })
              }
            </ul>
            
          </div>
        </div>
      </section>
    )
  }
}

export default connect(Home);