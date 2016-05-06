import React from 'react';
import { getRoom } from '../../actions/rooms';
import { getTeams } from '../../actions/teams';
import { connect } from 'react-redux';

import {FormattedHTMLMessage, injectIntl} from 'react-intl';

import Spin from '../../components/Spin/Spin.jsx';
import Menu from '../../components/Menu/Menu.jsx';
import './Room.scss';

const Room = React.createClass({
    propTypes: {
        dispatch: React.PropTypes.func,
        children: React.PropTypes.node,
        room: React.PropTypes.object,
        user: React.PropTypes.object
    },

    componentDidMount() {
        const {params} = this.props;

        this.props.dispatch(getRoom(params));
    },

    render() {
        const {intl, teams, room, room: {_id: roomId, users=[], name, owner, code}, user} = this.props;
        const meInRoom = users.find(({_id}) => _id === user.id);
        const iAmOwner = user.id === (!!owner && owner._id);

        if (!roomId) {
            return <Spin center />
        }

        return (
            <div className="room">
                <div className="room__header">
                    <Menu items={
                        [
                            {to: `/rooms/${roomId}/`, name: intl.formatMessage({id: 'Room.itself'})},
                            {to: `/rooms/${roomId}/bets/`, name: intl.formatMessage({id: 'Room.bets'})}
                        ]
                    } />
                    <h2 className="room__title">
                        {name}
                        {iAmOwner && <span className="room__code"> {code}</span>}
                    </h2>
                </div>
                <div className="room__content">
                    {React.cloneElement(this.props.children, {room, user, meInRoom, teams})}
                </div>
            </div>
        );
    }
});

function mapStateToProps({room, user, teams}) {
    return {room, user};
}

export default connect(mapStateToProps)(injectIntl(Room));
