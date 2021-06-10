import { Room, RoomTableRow, TableGame, Bet, GameFullTime, Game } from '../types';

export const FIRST_PLAYOFF_DAY = 4;

const isCorrectScore = ({ homeScore, awayScore }: Bet, { homeTeam, awayTeam }: GameFullTime): boolean => (
  homeScore === homeTeam &&
  awayScore === awayTeam
);

const isCorrectDifference = ({ homeScore, awayScore }: Bet, { homeTeam, awayTeam }: GameFullTime): boolean => (
  homeScore !== null && awayScore !== null && homeScore - awayScore === homeTeam - awayTeam
);

const isCorrectResult = ({ homeScore, awayScore }: Bet, { homeTeam, awayTeam }: GameFullTime): boolean => (
  homeScore !== null && awayScore !== null && (homeScore - awayScore) * (homeTeam - awayTeam) > 0
);

const isCorrectPromotion = ({ homeWins, awayWins }: Bet, { matchday, score: { winner } }: Game): boolean => (
  matchday >= FIRST_PLAYOFF_DAY && ((winner === 'HOME_TEAM' && homeWins) || (winner === 'AWAY_TEAM' && awayWins))
);

export const calculatePoints = (
  bet: Bet,
  game: Game | undefined,
  {
    differencePoints,
    playoffCoefficient,
    promotionPoints,
    resultPoints,
    scorePoints
  }: Room
): number | null => {
  if (!game || game.score.fullTime.homeTeam === null || game.score.fullTime.awayTeam === null) {
    return null;
  }

  if (bet.homeScore === null || bet.awayScore === null) {
    return 0;
  }

  const coefficient = game.matchday >= FIRST_PLAYOFF_DAY ? playoffCoefficient : 1;

  let points = 0;

  if (isCorrectPromotion(bet, game)) {
    points += promotionPoints;
  }
  if (isCorrectScore(bet, game.score.fullTime)) {
    return (points + scorePoints) * coefficient;
  }
  if (isCorrectDifference(bet, game.score.fullTime)) {
    return (points + differencePoints) * coefficient;
  }
  if (isCorrectResult(bet, game.score.fullTime)) {
    return (points + resultPoints) * coefficient;
  }

  return points;
}

export const getTotalScore = (items: TableGame[]) => (
  items.reduce((sum: number, item) => (sum + (item.points || 0)), 0)
);

export const getMaxPossiblePoints = (
  { scorePoints, playoffCoefficient, promotionPoints }: Room,
  matchday: number
) => (
  matchday >= FIRST_PLAYOFF_DAY
    ? (scorePoints + promotionPoints) * playoffCoefficient
    : scorePoints
);

export const getTrololoPoints = (table: RoomTableRow[], index: number, room: Room, matchday: number) => {
  const maxPossiblePoints = getMaxPossiblePoints(room, matchday);

  const maxPoints = table.reduce((result: number | null, row) => {
    const points = row.games[index].points;
    if (typeof points !== 'number') {
      return result;
    }

    return result === null || points > result
      ? points
      : result;
  }, null);

  return maxPoints === null ? null : maxPossiblePoints - maxPoints;
}
