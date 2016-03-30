import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from 'containers/App/App';
import Main from 'containers/Main/Main';
import Inner from 'containers/AppInner/AppInner';
import Register from 'containers/Register/Register';
import Dashboard from 'containers/Dashboard/Dashboard';

import RoomCreate from 'containers/RoomCreate/RoomCreate';
import Room from 'containers/Room/Room';
import RoomBets from 'containers/RoomBets/RoomBets';

export default (store) => {
    const requireAuth = (nextState, replace, callback) => {
        const { user: {authenticated}} = store.getState();
        if (!authenticated) {
            replace({
                pathname: '/',
                state: { nextPathname: nextState.location.pathname }
            });
        }
        callback();
    };

    const redirectAuth = (nextState, replace, callback) => {
        const { user: { authenticated }} = store.getState();
        if (authenticated) {
            replace({
              pathname: '/dashboard'
            });
        }
        callback();
    };
    return (
        <Route path="/" component={App}>
            <IndexRoute component={Main} onEnter={redirectAuth} />
            <Route component={Inner} >
                <Route path="register" component={Register} onEnter={redirectAuth} />
                <Route path="dashboard" component={Dashboard} onEnter={requireAuth} />
                <Route path="rooms/create/" component={RoomCreate} onEnter={requireAuth} />
                <Route path="rooms/:roomId/" component={Room} onEnter={requireAuth} />
                <Route path="rooms/:roomId/bets/" component={RoomBets} onEnter={requireAuth} />
            </Route>
        </Route>
    );
};
