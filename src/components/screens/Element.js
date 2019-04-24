import React from 'react';
import connect from '../../connect';
import elements from '../../elements.json';
import NotFoundScreen from './NotFound';
import ElementSubNav from '../ElementSubNav';

class Element extends React.Component {
  getCssPath() {
    return '../../../css/1/index.css';
  }

  getScss() {
    return this.getCssPath();
  }

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

    import('../../scss/1.scss').then((t) => {
      console.log(t);
    });

    return (
      <div className="container ElementListScreen">
        <ElementSubNav element={ this.props.match.params.element } />
        { this.props.children }
      </div>
    );
  }
}

export default connect(Element);