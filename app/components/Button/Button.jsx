import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button';

import './Button.scss';

const materialBlue300 = '#64B5F6';
const materialBlue500 = '#2196F3';
const materialBlue800 = '#1565C0';
const materialBlue900 = '#0D47A1';

const Button = React.createClass({
    render() {
        return (
            <RaisedButton
                className={`button ${this.props.mix}`} {...this.props}
                labelStyle={{textTransform: 'none'}}
                backgroundColor={this.props.primary && materialBlue500} />
        );
    }
});

export default Button;
