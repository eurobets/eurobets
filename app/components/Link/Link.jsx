import b from 'b_';
import React from 'react';
import { Link as RouterLink } from 'react-router';

import './Link.scss';

const Link = React.createClass({
    render() {
        const className = b('link', {theme: this.props.theme});

        return (
            <RouterLink className={`${className} ${this.props.mix}`} {...this.props} />
        );
    }
});

export default Link;
