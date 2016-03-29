import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button';

import './Button.scss';

const materialLightBlueA700 = '#0091EA';


const Button = React.createClass({
    render() {
        return (
            <RaisedButton
                className={`button ${this.props.mix}`} {...this.props}
                labelStyle={{textTransform: 'none'}}
                backgroundColor={this.props.primary && materialLightBlueA700} />
        );
    }
});

export default Button;
