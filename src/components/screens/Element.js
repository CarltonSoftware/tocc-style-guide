import React from 'react';
import connect from '../../connect';
import NotFoundScreen from './NotFound';
import ElementSubNav from '../ElementSubNav';
const stylesVersion = require('toccstyles').version;
const cdn = "https://s3.eu-west-2.amazonaws.com/toccstyles/" + stylesVersion;
const elements = require('toccstyles').elements;

class Element extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loadingHtml: false,
      loadingCss: false,
      html: '',
      css: '',
      view: 'Preview'
    };
  }

  getMb(props) {
    let mb = {
      id: 'vanilla'
    };

    if (!props) {
      props = this.props;
    }

    if (props.Tabs.selectedMarketingBrand) {
      mb = props.Tabs.selectedMarketingBrand;
    }

    return mb;
  }
  
  getFontsPath(mb) {
    return cdn + '/fonts/' + mb.id + '.css';
  }
  
  getCssPath(mb) {
    return cdn + '/' + mb.id + '/index.css';
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.element !== prevProps.match.params.element 
      || this.props.match.params.item !== prevProps.match.params.item
    ) {
      this.loadHtml();
      this.loadCss();
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

  loadCss() {
    let mb = this.getMb();
    this.setState({ loadingCss: true}, () => {
      fetch(cdn + '/' + mb.id + '/' + this.props.match.params.element + '/' + this.props.match.params.item + '/' + this.props.match.params.item + '.css').then((res) => {
        res.text().then((css) => {
          this.setState({ loadingCss: false, css: css });
        });
      });
    });
  }

  componentDidMount() {
    this.loadHtml();
    this.loadCss();
  }

  setView(event) {
    this.setState({ view: event.target.innerHTML });
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

    const cssCdn = this.getCssPath(this.getMb());
    const fontCdn = this.getFontsPath(this.getMb());
    const componentCdn = cdn + '/' + this.getMb().id + '/' + this.props.match.params.element + '/' + this.props.match.params.item + '/' + this.props.match.params.item + '.css';

    return (
      <div className="container ElementListScreen">
        <div className="columns">
          <div className="column is-one-fifth">
            <ElementSubNav element={ this.props.match.params.element } />
          </div>
          <div className="column is-four-fifths">
            { this.state.loadingHtml && <p>Loading preview</p> }
            <div className="content">
              <h2>{ element.name }</h2>
              <p>{ element.description }</p>
            </div>
            <div className="tags is-small">
              { 
                ['Preview', 'HTML', 'CSS', 'Use'].map((t, i) => {
                  let cls = ['tag'];
                  if (this.state.view === t) {
                    cls.push('is-primary');
                  }
                  return (
                    <a key={ i }  onClick={ this.setView.bind(this) } className={ cls.join(' ') }>{ t }</a>
                  );
                })
              }
            </div>
            { this.state.view === 'Preview' && <div dangerouslySetInnerHTML={ {__html: this.state.html } } /> }
            { this.state.view === 'HTML' && <pre>{ this.state.html }</pre> }
            { this.state.view === 'CSS' && <pre>{ this.state.css }</pre> }
            { this.state.view === 'Use' && <div className="content">
              <h3>Usage instructions</h3>
              <ol>
                <li>Add the following into the &lt;head&gt; tag:
                  <pre>
                    &lt;link rel="stylesheet" type="text/css" href="{fontCdn}" /&gt;
                  </pre>
                  <pre>
                    &lt;link rel="stylesheet" type="text/css" href="{cssCdn}/index.css" /&gt;
                  </pre>
                </li>
                <li>Alternatively, if you just want the css for this component, add the following:
                  <pre>
                    &lt;link rel="stylesheet" type="text/css" href="{fontCdn}" /&gt;
                  </pre>
                  <pre>
                    &lt;link rel="stylesheet" type="text/css" href="{componentCdn}" /&gt;
                  </pre>
                </li>
                <li>Use the html shown in the markup tab to create your element.</li>
              </ol>
            </div> }
            { this.props.children }
          </div>
        </div>
      </div>
    );
  }
}

export default connect(Element);