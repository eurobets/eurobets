import { combineReducers } from 'redux';
import bets from 'reducers/bets';
import games from 'reducers/games';
import teams from 'reducers/teams';
import message from 'reducers/message';
import room from 'reducers/room';
import user from 'reducers/user';
import { routerReducer as routing } from 'react-router-redux';

// Combine reducers with routeReducer which keeps track of
// router state
const rootReducer = combineReducers({
    bets,
    games,
    message,
    room,
    routing,
    teams,
    user
});

export default rootReducer;
