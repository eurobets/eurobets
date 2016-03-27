import b from 'b_';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

import './Notification.scss';

const Notification = React.createClass({
    render() {
        const {message, type} = this.props;
        return (
            <div className={b('notification', {'show': message && message.length > 0, 'success': type === 'SUCCESS'})}>
                {message}
            </div>
        );
    }
});

function mapStateToProps(state) {
    return {...state.message};
}

export default connect(mapStateToProps)(Notification);
