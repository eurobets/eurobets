import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Helmet from 'react-helmet';

import config from 'helmconfig.js';

const Meta = () => (
    <Helmet
        title="Eurobets"
        meta={config.meta}
        link={config.link} />
);

ReactDOMServer.renderToString(<Meta />);
let header = Helmet.rewind();

export default header;
