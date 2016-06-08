'use strict';

const _ = require('lodash');
const mongoose = require('mongoose');
const Bet = mongoose.model('Bet');
const footballData = require('./footballData');
const User = mongoose.model('User');
const Room = mongoose.model('Room');

function getResult(homeGoals, awayGoals) {
    if (homeGoals === awayGoals) {
        return 0;
    }
    return homeGoals > awayGoals ? 1 : -1;
}

function getBetResult(game, bet) {
    if (!game || !bet) {
        return null;
    }
    const hasResult = game.result.goalsHomeTeam !== null && game.result.goalsAwayTeam !== null;
    const correctScore = hasResult
        ? game.result.goalsHomeTeam === bet.homeScore && game.result.goalsAwayTeam === bet.awayScore
        : null;
    const correctDifference = hasResult
        ? !correctScore &&
        bet.homeScore !== null &&
        bet.awayScore !== null &&
        game.result.goalsAwayTeam - game.result.goalsHomeTeam === bet.awayScore - bet.homeScore
        : null;
    const correctResult = hasResult
        ? !correctScore &&
        !correctDifference &&
        bet.homeScore !== null &&
        bet.awayScore !== null &&
        getResult(game.result.goalsHomeTeam, game.result.goalsAwayTeam) ===
        getResult(bet.homeScore, bet.awayScore)
        : null;

    const betResult = {correctScore, correctDifference, correctResult};

    if (game.matchday > 3) {
        const hasGamePromotion = game.homeWins !== null && game.awayWins !== null;

        betResult.correctPromotion = hasGamePromotion
            ? bet.homeWins === game.homeWins && bet.awayWins === game.awayWins
            : null;
    }

    return betResult;
}

function getBetsTable(req, res, bets, fixtures, user) {
    let players = {};
    bets = bets || [];
    fixtures = fixtures || [];

    bets.forEach(bet => players[bet.owner] = bet.owner);

    players = _.mapValues(players, playerId => {
        const playersBets = {
            games: {},
            overall: {correctScores: 0, correctDifferences: 0, correctResults: 0, correctPromotions: 0}
        };

        fixtures.forEach(game => {
            const playerBetsForThisGame = bets.filter(bet => bet.owner === playerId && bet.game === game.id);
            const latestBet = playerBetsForThisGame[playerBetsForThisGame.length - 1] || null;

            if (latestBet && user !== latestBet.owner && !game.started) {
                latestBet.homeScore = null;
                latestBet.awayScore = null;
                latestBet.homeWins = null;
                latestBet.awayWins = null;
            }

            const betResult = getBetResult(game, latestBet);

            playersBets.games[game.id] = {
                data: latestBet,
                result: betResult
            };

            if (betResult) {
                playersBets.overall.correctScores += betResult.correctScore;
                playersBets.overall.correctDifferences += betResult.correctDifference;
                playersBets.overall.correctResults += betResult.correctResult;
                playersBets.overall.correctPromotions += betResult.correctPromotion;
            }
        });

        return playersBets;
    });

    return players;
}

function getFixturesRequest(callback) {
    footballData.getFixturesRequest(fixtures => {
        callback(fixtures);
    });
}

function getMyBets(req, res, fixtures) {
    Bet.find({owner: req.user.id}).exec((err, bets) => {
        if(!err && fixtures) {
            const betsByRoom  = _.groupBy(bets, bet => bet.room);

            return res.json(_.map(betsByRoom, (roomBets, key) => {
                return {[key]: getBetsTable(req, res, roomBets, fixtures, req.user.id)}
            }));
        } else {
            return res.status(400).json({message: {kind: 'getMyBetsError'}});
        }
    });
}

function getBetsInRoom(req, res, room, user, fixtures) {
    Bet
        .find({room: room})
        .exec((err, bets) => {
            if(!err && fixtures) {
                return res.json(getBetsTable(req, res, bets, fixtures, user));
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

exports.getMy = function(req, res) {
    getFixturesRequest(fixtures => {
        return getMyBets(req, res, fixtures);
    });
};

exports.create = function(req, res) {
    const mode = req.body.mode;

    delete req.body.mode;
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

            return mode === 'myBets'
                ? getMyBets(req, res, fixtures)
                : getBetsInRoom(req, res, req.body.room, req.user.id, fixtures);
        });
    });
};


function median(values) {
    values.sort( function(a,b) {return a - b;} );
    var half = Math.floor(values.length/2);
    if(values.length % 2)
        return values[half];
    else
        return Math.round((values[half-1] + values[half]) / 2.0);
}

function createBotBetFun(req, res, bot){
    getFixturesRequest(fixtures => {
        User
            .findOne({bot: bot})
            .exec((err, bot) => {
                if(!err) {
                    if (bot.bot === 'median') {
                        Bet.find({by_bot: { $ne: true }}).
                            exec((err, bets) => {
                                let away_scores = {};
                                let home_scores = {};
                                var games = [];
                                bets.forEach(bet => {
                                    if (away_scores.hasOwnProperty(bet.game)){
                                        away_scores[bet.game].push(bet.awayScore);
                                        home_scores[bet.game].push(bet.homeScore);
                                    } else {
                                        away_scores[bet.game] = [];
                                        home_scores[bet.game] = [];
                                        games.push(bet.game);
                                    }
                                });
                                Room.find({}).exec((err, rooms) => {
                                    for (var index=0; index < games.length; ++index) {
                                        const gamee = fixtures.find(game => game.id === games[index]);
                                        if (gamee.started){
                                            var to_create = false;
                                            Bet.find({owner: bot.id, game: games[index]}).exec((err, bets_bots) => {
                                                if (bets_bots.length === 0){
                                                    to_create = true;
                                                }
                                            });
                                            if(to_create){
                                                const awayScore = median(away_scores[games[index]]);
                                                const homeScore = median(home_scores[games[index]]);
                                                const owner = bot.id;
                                                const game = games[index];
                                                for (var i_room=0; i_room < rooms.length; ++i_rooms){
                                                    const room = rooms[i_room]._id;
                                                    Bet.create(awayScore, homeScore, owner, room, game);
                                                }
                                            }
                                        }
                                    }
                                });
                            });
                    } else {
                        return res.status(200);
                    }
                } else {
                    return res.status(400);
                }
            });
    });
}

exports.createBotsBets = function(req, res) {
    User.find({bot: { $ne: null }}).exec((err, bots) => {
        if(!err){
            bots.forEach(bot => {
                createBotBetFun(req, res, bot.bot);
            });
        } else {
            return res.status(400);
        }
    });
};

exports.createBotBet = function(req, res, bot) {
    createBotBetFun(req, res, bot);
};
