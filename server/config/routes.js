/**
 * Routes for express app
 */
const express = require('express');
const bets = require('../controllers/bets');
const topics = require('../controllers/topics');
const users = require('../controllers/users');
const rooms = require('../controllers/rooms');
const footballData = require('../controllers/footballData');
const mongoose = require('mongoose');
const path = require('path');
const compiled_app_module_path = path.resolve(__dirname, '../../', 'public', 'assets', 'server.js');
const App = require(compiled_app_module_path);

module.exports = function(app, passport) {
    // user routes
    app.post('/api/login', users.postLogin);
    app.post('/api/signup', users.postSignUp);
    app.post('/api/logout', users.postLogout);

    app.get('/api/rooms', rooms.all);
    app.post('/api/rooms', rooms.create);
    app.patch('/api/rooms/code/', rooms.addToGroupByCode);
    app.get('/api/rooms/:id', rooms.get);
    app.put('/api/rooms/:id', rooms.update);
    app.patch('/api/rooms/:id/change_me', rooms.changeMe);
    app.patch('/api/rooms/:id/remove_me', rooms.removeMe);
    app.patch('/api/rooms/:id/remove_user', rooms.removeUser);
    app.patch('/api/rooms/:id/add_bot', rooms.addBot);

    app.get('/api/games', footballData.getFixtures);
    app.get('/api/teams', footballData.getTeams);
    app.post('/api/bets', bets.create);
    app.get('/api/bets', bets.get);
    app.get('/api/bets/my/', bets.getMy);

    // bot routes
    app.get('/api/bets/bots/', bets.createBotsBets);
    app.get('/api/bets/bots/:name', bets.createBotBet);

    // google auth
    // Redirect the user to Google for authentication. When complete, Google
    // will redirect the user back to the application at
    // /auth/google/return
    // Authentication with google requires an additional scope param, for more info go
    // here https://developers.google.com/identity/protocols/OpenIDConnect#scope-param
    app.get('/auth/google', passport.authenticate('google', { scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email'
    ] }));

    // Google will redirect the user to this URL after authentication. Finish the
    // process by verifying the assertion. If valid, the user will be logged in.
    // Otherwise, the authentication has failed.
    app.get('/auth/google/callback',
        passport.authenticate('google', {
            successRedirect: '/dashboard',
            failureRedirect: '/'
        }));

    // topic routes
    app.get('/topic', topics.all);
    app.post('/topic/:id', (req, res) => topics.add(req, res));
    app.put('/topic/:id', (req, res) => topics.update(req, res));
    app.delete('/topic/:id', (req, res) => topics.remove(req, res));

    // This is where the magic happens. We take the locals data we have already
    // fetched and seed our stores with data.
    // App is a function that requires store data and url to initialize and return the React-rendered html string
    app.get('*', (req, res, next) => App.default(req, res));
};
