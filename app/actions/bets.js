import { polyfill } from 'es6-promise';
import request from 'axios';
import * as types from 'constants/index';

polyfill();

function apiRequest(method, betId, data, api='/api/bets') {
    return request[method](api + (betId ? `/${betId}` : ''), data);
}

function betsRequestStart(status) {
    return {
        type: types.BETS_REQUEST_START,
        status,
        message: {}
    };
}

function betsRequestFailure(message, status) {
    return {
        type: types.BETS_REQUEST_FAILURE,
        status,
        message
    };
}

function createBetSuccess(data, status) {
    return {
        type: types.CREATE_BET_SUCCESS,
        data,
        status
    };
}

function getBetsInRoomSuccess(data, status) {
    return {
        type: types.GET_BETS_IN_ROOM_SUCCESS,
        data,
        status
    };
}

export function createBet(data) {
    return (dispatch, getState) => {
        dispatch(betsRequestStart({creating: true, created: false}));

        return apiRequest('post', null, data)
            .then(res => {
                dispatch(createBetSuccess(res.data, {creating: false, created: true}));
            })
            .catch((err) => {
                dispatch(betsRequestFailure(err.data.message, {creating: false, created: false}))
            });
    };
}

export function getBetsInRoom(roomId) {
    return (dispatch, getState) => {
        dispatch(betsRequestStart({loading: true}));

        return apiRequest('get', null, null, `/api/bets/?room=${roomId}`)
            .then(res => {
                dispatch(getBetsInRoomSuccess(res.data, {loading: false}));
            })
            .catch((err) => {
                dispatch(betsRequestFailure({loading: false}))
            });
    };
}
