import { polyfill } from 'es6-promise';
import request from 'axios';
import { push } from 'react-router-redux';
import * as types from 'constants/index';

polyfill();

function apiRequest(method, roomId, data, api='/api/rooms') {
    return request[method](api + (roomId ? `/${roomId}` : ''), data);
}

function createRoomRequest() {
    return {
        type: types.CREATE_ROOM_REQUEST
    };
}

function createRoomSuccess() {
    return {
        type: types.CREATE_ROOM_SUCCESS
    };
}

function createRoomFailure(message) {
    return {
        type: types.CREATE_ROOM_FAILURE,
        message
    };
}

function getRoomRequest() {
    return {
        type: types.GET_ROOM_REQUEST
    };
}

function getRoomSuccess(data) {
    return {
        type: types.GET_ROOM_SUCCESS,
        data
    };
}

function getRoomFailure(message) {
    return {
        type: types.GET_ROOM_FAILURE,
        message
    };
}


export function createRoom(data) {
    return (dispatch, getState) => {
        dispatch(createRoomRequest());

        return apiRequest('post', null, data)
            .then(res => {
                dispatch(createRoomSuccess());
                dispatch(push(`/rooms/${res.data.id}/`));
            })
            .catch((err) => {
                dispatch(createRoomFailure(err.data.message))
            });
    };
}

export function getRoom({roomId}) {
    return (dispatch, getState) => {
        dispatch(getRoomRequest());

        return apiRequest('get', roomId)
            .then(res => {
                dispatch(getRoomSuccess(res.data));
            })
            .catch((err) => {
                dispatch(getRoomFailure())
            });
    };
}
