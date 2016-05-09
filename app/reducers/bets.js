import {
    BETS_REQUEST_START,
    BETS_REQUEST_FAILURE,
    CREATE_BET_SUCCESS,
    GET_BETS_IN_ROOM_SUCCESS
} from 'constants/index';

export default function room(state={}, action) {
    switch (action.type) {
        case BETS_REQUEST_START:
            return Object.assign({}, state, action);
        case BETS_REQUEST_FAILURE:
            return Object.assign({}, state, action);
        case CREATE_BET_SUCCESS:
            return Object.assign({}, state, action);
        case GET_BETS_IN_ROOM_SUCCESS:
            return Object.assign({}, state, action);
        default:
            return state;
    }
}
