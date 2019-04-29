import React from 'react';
import connect from '../../connect';
import elements from '../../elements.json';
import NotFoundScreen from './NotFound';
import ElementSubNav from '../ElementSubNav';

class Element extends React.Component {
  constructor(props) {
    super(props);

    this.importScss(props);

    this.state = {
      loadingHtml: false,
      html: '',
      view: 'View'
    };
  }

  importScss(props) {
    let mb = {
      id: 'vanilla'
    };
    if (props.Tabs.selectedMarketingBrand) {
      mb = props.Tabs.selectedMarketingBrand;
    }

    import('../../scss/' + props.match.params.element + '/' + mb.id + '/_' + props.match.params.item + '.scss');
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.element !== prevProps.match.params.element 
      || this.props.match.params.item !== prevProps.match.params.item
    ) {
      this.importScss(this.props);
      this.loadHtml();
    }
  }

  loadHtml() {
    this.setState({ loadingHtml: true}, () => {
      fetch(process.env.PUBLIC_URL + '/snippets/' + this.props.match.params.element + '/' + this.props.match.params.item + '.html').then((res) => {
        res.text().then((html) => {
          this.setState({ loadingHtml: false, html: html });
        });
      });
    });
  }

  componentDidMount() {
    this.loadHtml();
  }

  setView(event) {
    this.setState({ view: event.target.innerHTML });
  }

  getScss() {
    var styles = document.getElementsByTagName('style');
    var style = styles[styles.length - 1];

    for (var i = 0; i < styles.length; i++) {
      const m = '@filename _' + this.props.match.params.item + '.scss';
      if (styles[i].innerText.indexOf(m) >= 0) {
        return styles[i].innerText;
      }
    }

    return null;
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

    return (
      <div className="container ElementListScreen">
        <ElementSubNav element={ this.props.match.params.element } />
        { this.state.loadingHtml && <p>Loading preview</p> }
        <div className="content">
          <h2>{ element.name }</h2>
          <p>{ element.description }</p>
        </div>
        <div className="tags is-small">
          { 
            ['View', 'Text', 'Scss'].map((t, i) => {
              let cls = ['tag'];
              if (this.state.view === t) {
                cls.push('is-primary');
              }
              return (
                <a key={ i } onClick={ this.setView.bind(this) } className={ cls.join(' ') }>{ t }</a>
              );
            })
          }
        </div>
        { this.state.view === 'View' && <div dangerouslySetInnerHTML={ {__html: this.state.html } } /> }
        { this.state.view === 'Text' && <pre>{ this.state.html }</pre> }
        { this.state.view === 'Scss' && <pre>{ this.getScss() }</pre> }
        { this.props.children }
      </div>
    );
  }
}

export default connect(Element);