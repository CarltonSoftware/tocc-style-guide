import React from 'react';
import connect from '../../connect';
import elements from '../../elements.json';
import NotFoundScreen from './NotFound';
import ElementSubNav from '../ElementSubNav';
import Hero from '../Hero';

class ElementList extends React.Component {
  render() {
    if (!elements[this.props.match.params.element] 
      || elements[this.props.match.params.element].length === 0
    ) {
      return (
        <NotFoundScreen />
      );
    }

    const name = this.props.match.params.element;

    return (
      <div className="container ElementListScreen">
        <Hero>
          <h3>{ name.charAt(0).toUpperCase() + name.slice(1) }</h3>
          <ElementSubNav element={ this.props.match.params.element } />
        </Hero>
      </div>
    );
  }
}

export default connect(ElementList);