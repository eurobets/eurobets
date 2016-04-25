import React from 'react';
import { getRoom } from '../../actions/rooms';
import { connect } from 'react-redux';

const RoomBets = React.createClass({
    propTypes: {
        room: React.PropTypes.object
    },

    statics: {
        need: [
            getRoom
        ]
    },
    render() {
        const {room} = this.props;

        return (
            <div className="room-bets">
                Комнатушечка, ставочки
            </div>
        );
    }
});

function mapStateToProps(state) {
    return {
        room: state.room
    };
}

export default connect(mapStateToProps)(RoomBets);
