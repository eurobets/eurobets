import { polyfill } from 'es6-promise';
import request from 'axios';
import * as types from 'constants/index';

polyfill();

function apiRequest(method, gameId, data, api='/api/games') {
    return request[method](api + (gameId ? `/${gameId}` : ''), data);
}

function gamesRequestStart(data) {
    return {
        type: types.GAMES_REQUEST_START,
        ...data
    };
}

function gamesRequestFailure(data) {
    return {
        type: types.GAMES_REQUEST_FAILURE,
        ...data
    };
}

function getGamesSuccess(data) {
    return {
        type: types.GET_GAMES_SUCCESS,
        list: data
    };
}

export function getGames() {
    return (dispatch, getState) => {
        dispatch(gamesRequestStart({loading: true}));

        return apiRequest('get')
            .then(res => {
                dispatch(getGamesSuccess(res.data));
            })
            .catch((err) => {
                dispatch(gamesRequestFailure({loading: false}))
            });
    };
}
