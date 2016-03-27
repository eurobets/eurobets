import b from 'b_';
import React from 'react';

import './Logo.scss';

const Logo = React.createClass({
    render() {
        return (
            <span className={b('logo', {theme: this.props.theme})}>Euro 2016 Bets</span>
        );
    }
});

export default Logo;
