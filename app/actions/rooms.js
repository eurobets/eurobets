import { polyfill } from 'es6-promise';
import request from 'axios';
import { push } from 'react-router-redux';
import * as
    types from 'constants/index';

polyfill();

function apiRequest(method, roomId, data, api='/api/rooms') {
    return request[method](api + (roomId ? `/${roomId}` : ''), data);
}

function roomRequestStart(data) {
    return {
        type: types.ROOM_REQUEST_START,
        ...data
    };
}

function roomRequestFailure(data) {
    return {
        type: types.ROOM_REQUEST_FAILURE,
        ...data
    };
}

function createRoomSuccess() {
    return {
        type: types.CREATE_ROOM_SUCCESS
    };
}

function getRoomSuccess(data) {
    return {
        type: types.GET_ROOM_SUCCESS,
        data
    };
}

function getMyRoomsSuccess(data) {
    return {
        type: types.GET_ROOMS_SUCCESS,
        list: data
    };
}
function insertUserByCodeSuccess(data) {
    return {
        type: types.INSERT_USER_BY_CODE_SUCCESS,
        list: data
    };
}


export function createRoom(data) {
    return (dispatch, getState) => {
        dispatch(roomRequestStart({loading: true}));

        return apiRequest('post', null, data)
            .then(res => {
                dispatch(createRoomSuccess());
                dispatch(push(`/rooms/${res.data.id}/`));
            })
            .catch((err) => {
                dispatch(roomRequestFailure({message: err.data.message, loading: false}))
            });
    };
}

export function getRoom({roomId}) {
    return (dispatch, getState) => {
        dispatch(roomRequestStart({loading: true}));

        return apiRequest('get', roomId)
            .then(res => {
                dispatch(getRoomSuccess(res.data));
            })
            .catch((err) => {
                dispatch(roomRequestFailure({loading: false}))
            });
    };
}

export function insertUserByCode(code) {
    return (dispatch, getState) => {
        dispatch(roomRequestStart({addingRoom: true}));

        return apiRequest('patch', null, {code}, '/api/rooms/code')
            .then(res => {
                dispatch(insertUserByCodeSuccess(res.data));
            })
            .catch((err) => {
                dispatch(roomRequestFailure({message: err.data.message, addingRoom: false}))
            });
    };
}

export function getMyRooms() {
    return (dispatch, getState) => {
        dispatch(roomRequestStart({loading: true}));

        return apiRequest('get', null, {mine: true})
            .then(res => {
                dispatch(getMyRoomsSuccess(res.data));
            })
            .catch((err) => {
                dispatch(roomRequestFailure({loading: false}))
            });
    };
}
