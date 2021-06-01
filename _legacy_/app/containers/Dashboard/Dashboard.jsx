import b from 'b_';
import _ from 'lodash';
import React from 'react';
import {FormattedMessage, FormattedHTMLMessage, injectIntl} from 'react-intl';
import { connect } from 'react-redux';

import { getMyRooms, insertUserByCode } from '../../actions/rooms';

import Games from '../../components/Games/Games.jsx';
import Input from '../../components/Input/Input.jsx';
import Link from '../../components/Link/Link.jsx';
import Spin from '../../components/Spin/Spin.jsx';

import '../../i18n/ru';
import './Dashboard.scss';

const Dashboard = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },

    getInitialState() {
        return {
            addFocused: false,
            code: null
        }
    },

    render() {
        return (
            <div className="dashboard">
                <Games />
            </div>
        );
    }
});


function mapStateToProps({room: {rooms, loading, message}}) {
    return {rooms, loading, message};
}

export default connect(mapStateToProps)(injectIntl(Dashboard));

