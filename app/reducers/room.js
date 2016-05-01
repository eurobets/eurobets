import {
    ROOM_REQUEST_START,
    ROOM_REQUEST_FAILURE,
    CREATE_ROOM_SUCCESS,
    GET_ROOM_SUCCESS,
    GET_ROOMS_SUCCESS,
    INSERT_USER_BY_CODE_SUCCESS,
} from 'constants/index';


export default function room(state={}, action) {
    switch (action.type) {
        case ROOM_REQUEST_START:
            return Object.assign({}, state, action);
        case ROOM_REQUEST_FAILURE:
            return Object.assign({}, state, action);
        case CREATE_ROOM_SUCCESS:
            return Object.assign({}, state, {loading: false});
        case GET_ROOM_SUCCESS:
            return Object.assign({}, state, {loading: false}, action.data);
        case INSERT_USER_BY_CODE_SUCCESS:
            return Object.assign({}, state, {addingRoom: false}, {list: action.list});
        case GET_ROOMS_SUCCESS:
            return Object.assign({}, state, {loading: false}, {list: action.list});
        default:
            return state;
    }
}
