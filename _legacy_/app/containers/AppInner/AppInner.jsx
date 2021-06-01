import b from 'b_';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import Header from 'components/Header/Header';
import Notification from 'components/Notification/Notification';

import './AppInner.scss';

const App = React.createClass({
    propTypes: {
        children: PropTypes.object,
        message: PropTypes.string
    },
    render() {
        return (
            <div className={b('page', {mode: 'inner'})}>
                <Header />
                {this.props.message && <Notification />}
                <div className="page__content">{this.props.children}</div>
            </div>
        );
    }
});


function mapStateToProps(state) {
    return {...state.message};
}

export default connect(mapStateToProps)(App);
