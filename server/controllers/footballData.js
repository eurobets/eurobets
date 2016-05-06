'use strict';

const request = require('request');
const NodeCache = require( "node-cache" );
const myCache = new NodeCache({stdTTL: 20});

const options = {
    baseUrl: 'http://api.football-data.org/v1/',
    headers: {'X-Auth-Token': '286edb3afe074043bd0f3aa8687bd997'}
};

function getFixturesRequest(callback) {
    options.url = '/soccerseasons/424/fixtures/';

    myCache.get(options.url, (err, data) => {
        if (data === undefined) {
            return request(options, (error, response, body) => {
                const fixtures = (body ? JSON.parse(body).fixtures : []).map(game => {
                    const match = game._links.self.href.match(/\/fixtures\/(\d+)/);
                    return Object.assign(
                        {},
                        game,
                        {started: Date.now() > Date.parse(game.date)},
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
    options.url = '/soccerseasons/424/teams/';

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
