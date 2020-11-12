import React from 'react';
import connect from '../../connect';

class Logos extends React.Component {
  getLogos() {
    return ['emaillogo.png', 'logo.png'];
  }

  render() {
    let selectedWebsite = null;
    let logos = null;
    if (
      this.props.Tabs.selectedMarketingBrand &&
      this.props.Tabs.selectedMarketingBrand.id !== 'vanilla' &&
      this.props.Tabs.MarketingBrand
    ) {
      selectedWebsite = this.props.Tabs.MarketingBrand.getEntityById(
        this.props.Tabs.selectedMarketingBrand.id
      );
    }

    if (selectedWebsite) {
      let brandCode = selectedWebsite.code;
      brandCode = brandCode.substring(0, 2).toLowerCase();

      logos = this.getLogos();
      logos = logos.map((logo) => (
        <div key={logo} className="content">
          <h4>{logo}</h4>
          <p>
            <img
              src={'//logos.originalcottages.co.uk/' + brandCode + '/' + logo}
            />
          </p>
          <pre>
            https://logos.originalcottages.co.uk/{brandCode}/{logo}
            <br />
            http://logos.originalcottages.co.uk/{brandCode}/{logo}
          </pre>
        </div>
      ));
    }

    return (
      <div className="container">
        <div className="content">
          <h2>Logos</h2>
          <p>Logos for use in emails etc.</p>
        </div>
        <div className="oc-content">
          {logos}

          {!logos && <p>Select a website to see the available logos.</p>}
        </div>
      </div>
    );
  }
}

export default connect(Logos);
