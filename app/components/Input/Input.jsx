import React from 'react';
import TextField from 'material-ui/lib/TextField';
import './Input.scss';
const materialLightBlueA700 = '#0091EA';

const Input = React.createClass({
    render() {
        return (
            <TextField
                className={`input ${this.props.mix}`} {...this.props}
                underlineFocusStyle={{borderColor: materialLightBlueA700}} />
        );
    }
});

export default Input;
