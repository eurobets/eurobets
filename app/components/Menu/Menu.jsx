import React from 'react';
import Link from '../Link/Link.jsx';

import './Menu.scss';

const Menu = React.createClass({
    propTypes: {
        items: React.PropTypes.array
    },

    render() {
        const {items} = this.props;

        return (
            <nav className="menu">
                {items.map(item => (
                    <Link onlyActiveOnIndex key={item.to} to={item.to} mix="menu__item">{item.name}</Link>
                ))}
            </nav>
        );
    }
});

export default Menu
