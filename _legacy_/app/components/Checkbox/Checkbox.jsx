import React from 'react';
import MaterialCheckbox from 'material-ui/lib/checkbox';

import ThemeManager from 'material-ui/lib/styles/theme-manager';
import Theme from '../../styles/theme';

const Checkbox = React.createClass({
    childContextTypes: {
        muiTheme: React.PropTypes.object
    },

    getChildContext() {
        return {
            muiTheme: ThemeManager.getMuiTheme(Theme)
        };
    },
    render() {
        return (
            <MaterialCheckbox className={`checkbox ${this.props.mix || ''}`} {...this.props} />
        );
    }
});

export default Checkbox;
