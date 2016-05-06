import {
    GAMES_REQUEST_START,
    GAMES_REQUEST_FAILURE,
    GET_GAMES_SUCCESS
} from 'constants/index';

export default function games(state={}, action) {
    switch (action.type) {
        case GAMES_REQUEST_START:
            return Object.assign({}, state, action);
        case GAMES_REQUEST_FAILURE:
            return Object.assign({}, state, action);
        case GET_GAMES_SUCCESS:
            return Object.assign({}, state, {loading: false}, {list: action.list});
        default:
            return state;
    }
}
