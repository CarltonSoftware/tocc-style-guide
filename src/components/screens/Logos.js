import React from 'react';
import connect from '../../connect';

class Logos extends React.Component {
  getLogos() {
    // TODO: host this and download it
    return [
      {
        file: 'emaillogo.png',
        text: 'Logo for use in emails'
      },
      {
        file: 'logo.png',
        text: 'Logo for screen use, currently used on the websites'
      },
      {
        file: 'logo300dpi.png',
        text: 'High resolution logo for use in printed documents'
      },
      {
        file: 'logo72dpi.png',
        text: 'Larger logo for on-screen use.'
      }
    ];
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
        <div key={logo.file} className="content">
          <h4>{logo.file}</h4>
          <p>
            {logo.text}
          </p>
          <p>
            <img
              src={'//logos.originalcottages.co.uk/' + brandCode + '/' + logo.file}
            />
          </p>
          <pre>
            https://logos.originalcottages.co.uk/{brandCode}/{logo.file}
            <br />
            http://logos.originalcottages.co.uk/{brandCode}/{logo.file}
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
