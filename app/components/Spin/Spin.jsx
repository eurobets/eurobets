import b from 'b_';
import React from 'react';
import CircularProgress from 'material-ui/lib/circular-progress';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import Theme from '../../styles/theme';

import './Spin.scss';

const Spin = React.createClass({
    childContextTypes: {
        muiTheme: React.PropTypes.object
    },

    getChildContext() {
        return {
            muiTheme: ThemeManager.getMuiTheme(Theme)
        };
    },

    render() {
        const className = b('spin', {center: this.props.center});

        return (
            <CircularProgress className={`${className} ${this.props.mix || ''}`} />
        );
    }
});

export default Spin;
