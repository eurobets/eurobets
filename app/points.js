'use strict';

const GROUP_GAMES = 96; // TODO: внести в настройки турнира
const NOT_FINAL_GAMES = 120; // TODO: внести в настройки турнира

function getGamePoints(result, rules, matchday) {
    let points = 0;

    const coefficient = matchday > NOT_FINAL_GAMES && rules.finalsCoefficient
        ? rules.finalsCoefficient
        : 1;

    // в плей-офф можно получить дополнительные очки за проход дальше

    if (matchday > GROUP_GAMES && result.correctPromotion && rules.promotion) {
        points += rules.promotion;
    }

    if (result.correctScore) {
        return coefficient * (points + rules.score);
    }

    if (result.correctDifference) {
        return coefficient * (points + rules.difference);
    }

    if (result.correctResult) {
        return coefficient * (points + rules.result);
    }

    return coefficient * points;
}

function getOverallPoints(result, rules) {
    let points = 0;

    if (result.correctPromotions && rules.promotion) {
        points += rules.promotion * result.correctPromotions;
    }

    if (result.correctScores) {
        points += rules.score * result.correctScores;
    }

    if (result.correctDifferences) {
        points += rules.difference * result.correctDifferences;
    }

    if (result.correctResults) {
        points += rules.result * result.correctResults;
    }

    return points;
}

function getTrololoPoints(trololo, points, gamesMaxPoints, rules, games) {
    points[trololo._id] = {};

    if (games) {
        games.forEach(game => {
            let gameMaxPoints = rules.points.score;

            // в плей-офф добавляются очки за проход дальше
            if (game.matchday > GROUP_GAMES && rules.points.promotion) {
                gameMaxPoints = gameMaxPoints + rules.points.promotion;
            }

            // в полуфинале и финале очки домножаются на коэффициент
            if (game.matchday > NOT_FINAL_GAMES && rules.points.finalsCoefficient) {
                gameMaxPoints *= rules.points.finalsCoefficient;
            }

            points[trololo._id][game.id] = game.started ? gameMaxPoints - (gamesMaxPoints[game.id] || 0) : null;
        })
    }

    return points;
}

export {
    getGamePoints,
    getOverallPoints,
    getTrololoPoints,
    GROUP_GAMES,
    NOT_FINAL_GAMES
}
