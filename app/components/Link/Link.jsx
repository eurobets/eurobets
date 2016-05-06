import b from 'b_';
import React from 'react';
import { Link as RouterLink } from 'react-router';

import './Link.scss';

const Link = React.createClass({
    render() {
        const {theme, pseudo, disabled, mix=''} = this.props;
        const className = b('link', {theme, pseudo, disabled});
        if (pseudo || disabled) {
           return <span className={`${className} ${mix}`} {...this.props} />
        }
        return (
            <RouterLink
                activeClassName="link_active"
                className={`${className} ${mix}`}
                {...this.props} />
        );
    }
});

export default Link;
