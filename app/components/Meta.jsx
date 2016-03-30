import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Helmet from 'react-helmet';

import config from 'helmconfig.js';

class Meta extends React.Component {
  render() {
    return (
      <Helmet
        title="EURO 2016 BETS"
        meta={config.meta}
        link={config.link}
      />
    );
  }
}

ReactDOMServer.renderToString(<Meta />);
let header = Helmet.rewind();

export default header;
