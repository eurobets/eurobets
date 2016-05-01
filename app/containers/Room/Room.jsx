import React from 'react';
import { getRoom } from '../../actions/rooms';
import { connect } from 'react-redux';

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
        const {room, room: {_id: roomId, users=[], name, owner, code}, user} = this.props;
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
                            {to: `/rooms/${roomId}/`, name: 'Home'},
                            {to: `/rooms/${roomId}/bets/`, name: 'Bets'}
                        ]
                    } />
                    <h2 className="room__title">
                        {name}
                        {iAmOwner && <span className="room__code"> {code}</span>}
                    </h2>
                </div>
                <div className="room__content">
                    {React.cloneElement(this.props.children, {room, user, meInRoom})}
                </div>
            </div>
        );
    }
});

function mapStateToProps({room, user}) {
    return {room, user};
}

export default connect(mapStateToProps)(Room);
