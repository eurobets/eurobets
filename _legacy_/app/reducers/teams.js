import {
    TEAMS_REQUEST_START,
    TEAMS_REQUEST_FAILURE,
    GET_TEAMS_SUCCESS
} from 'constants/index';

export default function teams(state={}, action) {
    switch (action.type) {
        case TEAMS_REQUEST_START:
            return Object.assign({}, state, action);
        case TEAMS_REQUEST_FAILURE:
            return Object.assign({}, state, action);
        case GET_TEAMS_SUCCESS:
            return Object.assign({}, state, {loading: false}, {list: action.list});
        default:
            return state;
    }
}
