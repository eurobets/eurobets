import React from 'react';
import SelectField from 'material-ui/lib/select-field';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import Theme from '../../styles/theme';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();


const Select = React.createClass({
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
            <SelectField className={`select ${this.props.mix || ''}`} {...this.props} />
        );
    }
});

export default Select;
