import React from 'react';
import TextField from 'material-ui/lib/TextField';
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
            <TextField
                className={`input ${this.props.mix || ''}`} {...this.props} />
        );
    }
});

export default Checkbox;
