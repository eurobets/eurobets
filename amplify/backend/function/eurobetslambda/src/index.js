const request = require('request');
const NodeCache = require('node-cache');

const myCache = new NodeCache({stdTTL: 20});

const GAMES = 'GAMES';
const TEAMS = 'TEAMS';
const prefix = 'http://api.football-data.org/v2';

const endpoints = {
    games: `${prefix}/competitions/EC/matches`,
    teams: `${prefix}/competitions/EC/teams`
};

const options = {
    headers: {'X-Auth-Token': '286edb3afe074043bd0f3aa8687bd997'}
};

const mergeGamesWithTeams = (games, teams) => {
    return games.map((game) => {
        return {
            ...game,
            homeTeam: {
                ...game.homeTeam,
                icon: game.homeTeam.id && teams.find(team => team.id === game.homeTeam.id).crestUrl
            },
            awayTeam: {
                ...game.awayTeam,
                icon: game.awayTeam.id && teams.find(team => team.id === game.awayTeam.id).crestUrl
            },
            score: {
                ...game.score,
                fullTime: {
                    homeTeam: game.score.fullTime.homeTeam === null
                      ? null
                      : game.score.fullTime.homeTeam - (game.score.extraTime.homeTeam || 0),
                    awayTeam: game.score.fullTime.awayTeam === null
                      ? null
                      : game.score.fullTime.awayTeam - (game.score.extraTime.awayTeam || 0)
                }
            }
        }
    })
}

const getGamesRequest = () => new Promise((resolve, reject) => {
    const cachedGames = myCache.get(GAMES);
    if (cachedGames) {
        return resolve(cachedGames);
    }

    request(endpoints.games, options, (error, response, body) => {
        if (error) {
            return reject(error);
        }
        const games = (body && JSON.parse(body).matches || []);
        myCache.set(GAMES, games);
        resolve(games);
    });
});

const getTeamsRequest = () => new Promise((resolve, reject) => {
    const cachedTeams = myCache.get(TEAMS);
    if (cachedTeams) {
        return resolve(cachedTeams);
    }
    request(endpoints.teams, options, (error, response, body) => {
        if (error) {
            return reject(error);
        }
        const teams = JSON.parse(body).teams;

        myCache.set(TEAMS, teams);
        return resolve(teams);
    });
});

exports.handler = async () => {
    const [games, teams] = await Promise.all([
        await getGamesRequest(),
        await getTeamsRequest()
    ]);
    return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*"
        },
        body: JSON.stringify(mergeGamesWithTeams(games, teams)),
    };
};
