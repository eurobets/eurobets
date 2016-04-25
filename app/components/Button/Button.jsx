import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import FlatButton from 'material-ui/lib/flat-button';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import Theme from '../../styles/theme';

const Button = React.createClass({
    childContextTypes: {
        muiTheme: React.PropTypes.object
    },

    getChildContext() {
        return {
            muiTheme: ThemeManager.getMuiTheme(Theme)
        };
    },

    render() {
        const {flat} = this.props;

        return React.createElement(flat ? FlatButton : RaisedButton, {
            className: `button ${this.props.mix || ''}`,
            labelStyle: {textTransform: 'none'},
            ...this.props
        });
    }
});

export default Button;
