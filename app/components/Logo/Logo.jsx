import b from 'b_';
import React from 'react';

import './Logo.scss';

const Logo = React.createClass({
    render() {
        return (
            <span className={b('logo', {theme: this.props.theme})}>World Cup 2018</span>
        );
    }
});

export default Logo;
