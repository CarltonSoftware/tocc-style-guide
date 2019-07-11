import React from 'react';
import connect from '../../connect';
const versionNumber = require('toccstyles').version;

function CssHoc(CssComponent, CssProperty) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this._ref = React.createRef();
      this.state = {
        value: null,
        loading: true
      };
    }

    componentDidMount() {
      setTimeout(function() {
        if (this._ref.current) {
          const styles = window.getComputedStyle(this._ref.current);
          this.setState({
            value: styles[CssProperty],
            loading: false
          });
        }
      }.bind(this), 1000);
    }
    
    render() {
      return (
        <CssComponent cssRef={ this._ref } cssLoading={ this.state.loading } cssValue={ this.state.value } {...this.props} />
      );
    }
  }
}

class Home extends React.Component {
  render() {
    let selectedWebsite = null;
    if (this.props.Tabs.selectedMarketingBrand 
      && this.props.Tabs.selectedMarketingBrand.id !== 'vanilla'
      && this.props.Tabs.MarketingBrand
    ) {
      selectedWebsite = this.props.Tabs.MarketingBrand.getEntityById(this.props.Tabs.selectedMarketingBrand.id);
    }
    
    const colors = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 
      'eight', 'darkgrey', 'lightgrey', 'reallylightgrey', 'almostwhite'];
    
    const Tf = CssHoc(
      (props) => {
        return (
          <h5 ref={ props.cssRef }>
            Title font: { props.cssLoading && '...' }{ !props.cssLoading && props.cssValue }
          </h5>
        );
      },
      'fontFamily'
    );
    
    const Bf = CssHoc(
      (props) => {
        return (
          <p ref={ props.cssRef }>
            Body font: { props.cssLoading && '...' }{ !props.cssLoading && props.cssValue }
          </p>
        );
      },
      'fontFamily'
    );
    
    const Sf = CssHoc(
      (props) => {
        return (
          <blockquote className="oc-slogan" ref={ props.cssRef }>
            Slogan font: { props.cssLoading && '...' }{ !props.cssLoading && props.cssValue }
          </blockquote>
        );
      },
      'fontFamily'
    );
    
    return (
      <section className="hero">
        <div className="hero-body">
          <div className="container">
            <div className="oc-content">
              <h1>
                The Original Cottage Company
                <small className="oc-subtitle">Style Guide version: { versionNumber }</small>
              </h1>
              <p>This site is intended to be a store of the components used in TOCC web applications.</p>
              <p>
                You will be able to browse components by type and see the 
                marketing brand variances by selecting brand from the navigation bar above.
              </p>
            
              <h4>Globals { selectedWebsite && <span>for { selectedWebsite.name }</span> }</h4>
              <h5>Colours</h5>
              <ul className="oc-list--inline oc-clear__margin--small">
                { 
                  colors.map((c, i) => {
                    const Col = CssHoc(
                      (props) => {
                        return (
                          <span ref={ props.cssRef } style={ { border: '1px solid #CCC', textShadow: '1px 1px 0px #CCC' } } className={ "oc-label oc-label--" + props.color }>
                            { props.color }: { props.cssLoading && '...' }{ !props.cssLoading && props.cssValue }
                          </span>
                        );
                      },
                      'backgroundColor'
                    );
                    return (
                      <li key={ i }>
                        <Col color={ c } />
                      </li>
                    );
                  })
                }
              </ul>
              <h5>Fonts</h5>
              <Tf />
              <Bf />
            </div>
            <Sf />
            
          </div>
        </div>
      </section>
    )
  }
}

export default connect(Home);