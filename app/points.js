function getGamePoints(result, rules) {
    let points = 0;

    if (result.correctPromotion && rules.promotion) {
        points += rules.promotion;
    }

    if (result.correctScore) {
        return points + rules.score;
    }

    if (result.correctDifference) {
        return points + rules.difference;
    }

    if (result.correctResult) {
        return points + rules.result;
    }

    return points;
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

export {
    getGamePoints,
    getOverallPoints
}
