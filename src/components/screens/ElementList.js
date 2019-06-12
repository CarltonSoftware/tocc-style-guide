import React from 'react';
import connect from '../../connect';
import NotFoundScreen from './NotFound';
import ElementSubNav from '../ElementSubNav';
import Hero from '../Hero';
const elements = require('toccstyles').elements;

class ElementList extends React.Component {
  render() {
    if (!elements[this.props.match.params.element] 
      || elements[this.props.match.params.element].length === 0
    ) {
      return (
        <NotFoundScreen />
      );
    }

    return (
      <div className="container ElementListScreen">
        <Hero>
          <ElementSubNav element={ this.props.match.params.element } />
        </Hero>
      </div>
    );
  }
}

export default connect(ElementList);