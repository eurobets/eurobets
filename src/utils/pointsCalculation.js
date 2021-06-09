const FIRST_PLAYOFF_DAY = 4;

const isCorrectScore = ({ homeScore, awayScore }, { homeTeam, awayTeam }) => (
  homeScore === homeTeam &&
  awayScore === awayTeam
);

const isCorrectDifference = ({ homeScore, awayScore }, { homeTeam, awayTeam }) => (
  homeScore - awayScore === homeTeam - awayTeam
);

const isCorrectResult = ({ homeScore, awayScore }, { homeTeam, awayTeam }) => (
  (homeScore - awayScore) * (homeTeam - awayTeam) > 0
);

const isCorrectPromotion = ({ homeWins, awayWins }, { matchday, score: { winner } }) => (
  matchday >= FIRST_PLAYOFF_DAY && ((winner === 'HOME_TEAM' && homeWins) || (winner === 'AWAY_TEAM' && awayWins))
);

export const calculatePoints = (bet, game, {
  differencePoints, playoffCoefficient, promotionPoints, resultPoints, scorePoints
}) => {
  if (!game || game.score.fullTime.homeTeam === null || game.score.fullTime.awayTeam === null) {
    return null;
  }

  if (bet.homeScore === null || bet.awayScore === null) {
    return 0;
  }

  let points = 0;

  if (isCorrectPromotion(bet, game)) {
    console.log('promo');

    points += promotionPoints;
  }
  if (isCorrectScore(bet, game.score.fullTime)) {
    return (points + scorePoints) * playoffCoefficient;
  }
  if (isCorrectDifference(bet, game.score.fullTime)) {
    return (points + differencePoints) * playoffCoefficient;
  }
  if (isCorrectResult(bet, game.score.fullTime)) {
    return (points + resultPoints) * playoffCoefficient;
  }

  return points;
}

export const getTotalScore = (items) => items.reduce((sum, item) => (sum + (item.points || 0)), 0);

export const getMaxPossiblePoints = ({ scorePoints, playoffCoefficient, promotionPoints }, matchday) => (
  matchday >= FIRST_PLAYOFF_DAY
    ? (scorePoints + promotionPoints) * playoffCoefficient
    : scorePoints
);

export const getTrololoPoints = (table, index, room, matchday) => {
  const maxPossiblePoints = getMaxPossiblePoints(room, matchday);

  const maxPoints = table.reduce((result, player) => {
    const points = player.games[index].points;
    if (typeof points !== 'number') {
      return null;
    }

    return result > points ? result : points;
  }, null);

  return maxPoints === null ? null : maxPossiblePoints - maxPoints;
}
