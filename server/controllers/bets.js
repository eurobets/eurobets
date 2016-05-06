'use strict';

const _ = require('lodash');
const mongoose = require('mongoose');
const Bet = mongoose.model('Bet');
const footballData = require('./footballData');

function getBetsTable(req, res, bets, fixtures, user) {
    let players = {};
    bets = bets || [];
    fixtures = fixtures || [];

    bets.forEach(bet => players[bet.owner] = bet.owner);

    players = _.mapValues(players, playerId => {
        const playersBets = {};

        fixtures.forEach(game => {
            const playerBetsForThisGame = bets.filter(bet =>
                bet.owner === playerId &&
                bet.game === game.id
            );

            const latestBet = playerBetsForThisGame[playerBetsForThisGame.length - 1];

            if (latestBet && user !== latestBet.owner && !game.started) {
                latestBet.homeScore = null;
                latestBet.awayScore = null;
                latestBet.homeWins = null;
                latestBet.awayWins = null;
            }

            return playersBets[game.id] = latestBet;
        });

        return playersBets;
    });

    return res.json(players);


}

function getFixturesRequest(callback) {
    footballData.getFixturesRequest(fixtures => {
        callback(fixtures);
    });
}

function getMyBetsInRoom(req, res) {
    Bet.find({owner: req.user.id}).exec((err, rooms) => {
        if(!err) {
            return res.json(rooms);
        } else {
            console.log('Error in first query');
        }
    });
}

function getBetsInRoom(req, res, room, user, fixtures) {
    Bet
        .find({room: room})
        .exec((err, bets) => {
            if(!err && fixtures) {
                return getBetsTable(req, res, bets, fixtures, user);
            } else {
                return res.status(400).json({message: {kind: 'getBetsInRoomError'}});
            }
        });
}

exports.get = function(req, res) {
    getFixturesRequest(fixtures => {
        return getBetsInRoom(req, res, req.query.room, req.user.id, fixtures);
    });
};

exports.create = function(req, res) {
    getFixturesRequest(fixtures => {
        req.body.owner = req.user.id;
        const game = fixtures.find(game => game.id === req.body.game);
        if (!game) {
            return res.status(400).json({message: {kind: 'noGame'}});
        }
        if (game.started) {
            return res.status(400).json({message: {kind: 'gameAlreadyStarted'}});
        }

        Bet.create(req.body, (err, bet) => {
            if (err) {
                return res.status(400).json({message: err.errors});
            }

            return getBetsInRoom(req, res, req.body.room, req.user.id, fixtures);
        });
    });
};

