import React from 'react';
import { getRoom } from '../../actions/rooms';
import { getBetsInRoom } from '../../actions/bets';
import { getGames } from '../../actions/games';
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
        const {params, dispatch} = this.props;

        dispatch(getRoom(params));
        dispatch(getBetsInRoom(params.roomId));
        dispatch(getGames());
    },

    render() {
        const {intl, room: {_id: roomId, name, owner, code}, user} = this.props;
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
                        {iAmOwner && <span className="room__code">{code}</span>}
                    </h2>
                </div>
                <div className="room__content">
                    {this.props.children}
                </div>
            </div>
        );
    }
});

function mapStateToProps({room, user, bets: {data}, games}) {
    return {room, user, bets: data, games};
}

export default connect(mapStateToProps)(injectIntl(Room));
