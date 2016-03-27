import React from 'react';
import TextField from 'material-ui/lib/TextField';
import './Input.scss';
const materialBlue300 = '#64B5F6';
const materialBlue500 = '#2196F3';
const materialBlue800 = '#1565C0';
const materialBlue900 = '#0D47A1';

const Input = React.createClass({
    render() {
        return (
            <TextField
                className={`input ${this.props.mix}`} {...this.props}
                underlineFocusStyle={{borderColor: materialBlue300}} />
        );
    }
});

export default Input;
