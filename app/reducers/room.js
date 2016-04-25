import {
    CREATE_ROOM_REQUEST,
    CREATE_ROOM_SUCCESS,
    CREATE_ROOM_FAILURE,
    GET_ROOM_REQUEST,
    GET_ROOM_FAILURE,
    GET_ROOM_SUCCESS
} from 'constants/index';


export default function room(state={}, action) {
    switch (action.type) {
        case CREATE_ROOM_REQUEST:
            return Object.assign({}, state, {
                creating: true
            });
        case CREATE_ROOM_FAILURE:
            return Object.assign({}, state, {
                creating: false,
                message: action.message
            });
        case CREATE_ROOM_SUCCESS:
            return Object.assign({}, state, {
                creating: false
            });
        case GET_ROOM_REQUEST:
            return Object.assign({}, state, {
                loading: true
            });
        case GET_ROOM_FAILURE:
            return Object.assign({}, state, {
                loading: false
            });
        case GET_ROOM_SUCCESS:
            return Object.assign({}, state, {
                loading: false
            }, action.data);
        default:
            return state;
    }
}
