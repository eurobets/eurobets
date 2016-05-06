import { polyfill } from 'es6-promise';
import request from 'axios';
import * as types from 'constants/index';

polyfill();

function apiRequest(method, teamId, data, api='/api/teams') {
    return request[method](api + (teamId ? `/${teamId}` : ''), data);
}

function teamsRequestStart(data) {
    return {
        type: types.TEAMS_REQUEST_START,
        ...data
    };
}

function teamsRequestFailure(data) {
    return {
        type: types.TEAMS_REQUEST_FAILURE,
        ...data
    };
}

function getTeamsSuccess(data) {
    return {
        type: types.GET_TEAMS_SUCCESS,
        list: data
    };
}

export function getTeams() {
    return (dispatch, getState) => {
        dispatch(teamsRequestStart({loading: true}));

        return apiRequest('get')
            .then(res => {
                dispatch(getTeamsSuccess(res.data));
            })
            .catch((err) => {
                dispatch(teamsRequestFailure({loading: false}))
            });
    };
}
