import React from 'react';
import connect from '../../connect';
import elements from '../../elements.json';
import NotFoundScreen from './NotFound';
import ElementSubNav from '../ElementSubNav';

class Element extends React.Component {
  render() {
    if (!elements[this.props.match.params.element] 
      || elements[this.props.match.params.element].length === 0
    ) {
      return (
        <NotFoundScreen />
      );
    }

    // Find element by name
    const element = elements[this.props.match.params.element].filter((e) => {
      return e.name === this.props.match.params.item;
    }).shift();

    if (!element) {
      return (
        <NotFoundScreen />
      );
    }

    const style = require('../../../scss/' + this.props.match.params.element + '/vanilla/_' + this.props.match.params.item + '.scss');
    console.log(style.toString());

    return (
      <div className="container ElementListScreen">
        <ElementSubNav element={ this.props.match.params.element } />
        { this.props.children }
      </div>
    );
  }
}

export default connect(Element);