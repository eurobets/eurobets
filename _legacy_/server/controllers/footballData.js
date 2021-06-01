'use strict';

const request = require('request');
const NodeCache = require('node-cache');
const myCache = new NodeCache({stdTTL: 20});

const TOURNAMENT = 467; // WC 2018, TODO: move to room attributes

const endpoints = {
    fixtures: '/soccerseasons/' + TOURNAMENT + '/fixtures/',
    teams: '/soccerseasons/' + TOURNAMENT + '/teams/'
};

const options = {
    baseUrl: 'http://api.football-data.org/v1/',
    headers: {'X-Auth-Token': '286edb3afe074043bd0f3aa8687bd997'}
};

function getWinner(result) {
    if (result.penaltyShootout) {
        switch (getResult(result.penaltyShootout.goalsHomeTeam, result.penaltyShootout.goalsAwayTeam)) {
            case 1:
                return {homeWins: true, awayWins: false};
            case -1:
                return {homeWins: false, awayWins: true};
            default:
                return {homeWins: null, awayWins: null};
        }
    }

    if (result.extraTime) {
        switch (getResult(result.extraTime.goalsHomeTeam, result.extraTime.goalsAwayTeam)) {
            case 1:
                return {homeWins: true, awayWins: false};
            case -1:
                return {homeWins: false, awayWins: true};
            default:
                return {homeWins: null, awayWins: null};
        }
    }

    switch (getResult(result.goalsHomeTeam, result.goalsAwayTeam)) {
        case 1:
            return {homeWins: true, awayWins: false};
        case -1:
            return {homeWins: false, awayWins: true};
        default:
            return {homeWins: null, awayWins: null};
    }
}

function getResult(homeGoals, awayGoals) {
    if (homeGoals === awayGoals) {
        return 0;
    }
    return homeGoals > awayGoals ? 1 : -1;
}

function getFixturesRequest(callback) {
    options.url = endpoints.fixtures;

    myCache.get(options.url, (err, data) => {
        if (data === undefined) {
            return request(options, (error, response, body) => {
                const fixtures = (body ? JSON.parse(body).fixtures : []).map(game => {
                    const match = game._links.self.href.match(/\/fixtures\/(\d+)/);

                    // if (Date.parse("2016-06-15T12:00:00Z") > Date.parse(game.date)) {
                    //     game.result.goalsHomeTeam = Math.floor(Math.random() * 4);
                    //     game.result.goalsAwayTeam = Math.floor(Math.random() * 4);
                    // }

                    game = Object.assign({}, game, getWinner(game.result));

                    return Object.assign(
                        {},
                        game,
                        {started: Date.now() + 1000 * 60 * 5 > Date.parse(game.date)},
                        //{started: Date.parse("2016-06-15T12:00:00Z") > Date.parse(game.date)},
                        match && {id: match[1]});
                });
                myCache.set(options.url, fixtures);
                callback(fixtures);
            });
        }

        return callback(data);
    });
}

exports.getFixturesRequest = getFixturesRequest;

exports.getFixtures = function(req, res) {
    getFixturesRequest(fixtures => res.json(fixtures));
};

exports.getTeams = function(req, res) {
    options.url = endpoints.teams;

    request(options, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            let teams;
            try {
                teams = JSON.parse(body).teams;
            } catch (err) {
                return res.status(400).json({message: 'parseTeamsError'});
            }
            return res.json(teams);
        }

        return res.status(response.statusCode).json({message: 'loadTeamsError'});
    })
};
