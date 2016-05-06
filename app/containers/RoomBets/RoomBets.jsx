import React from 'react';
import { getRoom } from '../../actions/rooms';
import { connect } from 'react-redux';

import BetsTable from '../../components/BetsTable/BetsTable.jsx';

import './RoomBets.scss';

const RoomBets = React.createClass({
    propTypes: {
        room: React.PropTypes.object
    },

    render() {
        const {room} = this.props;

        return (
            <div className="room-bets">
                <BetsTable room={room} />
            </div>
        );
    }
});

export default RoomBets;
