import {
    BETS_REQUEST_START,
    BETS_REQUEST_FAILURE,
    CREATE_BET_SUCCESS,
    GET_BETS_IN_ROOM_SUCCESS
} from 'constants/index';

export default function room(state={}, action) {
    return Object.assign({}, state, action);
}
