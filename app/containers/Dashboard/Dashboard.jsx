import b from 'b_';
import _ from 'lodash';
import React from 'react';
import {FormattedMessage, FormattedHTMLMessage, injectIntl} from 'react-intl';
import { connect } from 'react-redux';

import { getMyRooms, insertUserByCode } from '../../actions/rooms';

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

    componentDidMount() {
        this.props.dispatch(getMyRooms());
    },

    componentWillReceiveProps({rooms: nextRooms=[]}) {
        const {rooms=[]} = this.props;

        if (rooms.length !== nextRooms.length) {
            this.setState(this.getInitialState());
            if (window.document.activeElement) {
                window.document.activeElement.blur();
            }
        }
    },

    onInputChange({target: {value}}) {
        this.setState({code: value});
        if (value.length === 9) {
            this.props.dispatch(insertUserByCode(value));
        }
    },

    render() {
        const {intl, rooms=[], loading, message} = this.props;
        const {code, addFocused} = this.state;
        const codeError = _.get(message, ['code', 'kind']);

        return (
            <div className="dashboard">
                {loading
                    ? <Spin center />
                    : <div className="dashboard__rooms">
                        {rooms.map(({_id: id, name, users, chargeUsers, rules}) => {
                            return (
                                <Link key={id} to={`/rooms/${id}/`} mix="dashboard__room">
                                    <div className="dashboard__room-name">{name}</div>
                                    <div className="dashboard__room-content">
                                        <div>
                                            <FormattedHTMLMessage
                                                id="RoomMain.overallPlayers"
                                                values={{players: `${users.length}`}} />
                                        </div>
                                        {!rules.free &&
                                            <div>
                                                <FormattedHTMLMessage id="RoomMain.overallBank" values={{
                                                    currency: rules.charge.currency,
                                                    value: `${(rules.charge.value || 0) * chargeUsers.length}`
                                                }} />
                                            </div>}
                                    </div>
                                </Link>
                            )
                        })}
                        <div className={b('dashboard', 'room', {add: true, focused: addFocused})}>
                            <div className="dashboard__room-name">
                                <FormattedMessage id="Dashboard.addRoom" />
                            </div>
                            <div className="dashboard__room-content">
                                <div className="dashboard__add-room-input-wrapper">
                                    <Input
                                        mix="dashboard__add-room-input"
                                        value={code}
                                        errorText={codeError && intl.formatMessage({id: `Dashboard.${codeError}`})}
                                        onChange={this.onInputChange}
                                        onBlur={() => this.setState({addFocused: false})}
                                        onFocus={() => this.setState({addFocused: true})}
                                        hintStyle={{left: 0, right: 0}}
                                        hintText={intl.formatMessage({id: 'Dashboard.enterTheCode'})} />
                                </div>
                                <Link to="/rooms/create/" mix="dashboard__create-room">
                                    <FormattedMessage id="Dashboard.createNewRoom" />
                                </Link>
                            </div>
                        </div>
                    </div>}
            </div>
        );
    }
});


function mapStateToProps({room: {list, loading, message}}) {
    return {rooms: list, loading, message};
}

export default connect(mapStateToProps)(injectIntl(Dashboard));

