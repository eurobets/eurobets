import uniqWith from 'lodash/uniqWith';

import { Room, RoomTableRow, TableGame, Bet, GameFullTime, Game, Player, User, Sorting } from '../types';

export const FIRST_PLAYOFF_DAY = 4;
const UNDERDOG_BONUS = 2;
const UNDERDOG_APPLICABLE_LENGTH = 8;

const isCorrectScore = (
  { homeScore, awayScore }: Bet,
  { homeTeam, awayTeam }: GameFullTime,
): boolean => (
  homeScore === homeTeam
  && awayScore === awayTeam
);

const isCorrectDifference = (
  { homeScore, awayScore }: Bet,
  { homeTeam, awayTeam }: GameFullTime,
): boolean => (
  homeScore !== null
  && awayScore !== null
  && homeScore - awayScore === homeTeam - awayTeam
);

const isCorrectResult = (
  { homeScore, awayScore }: Bet,
  { homeTeam, awayTeam }: GameFullTime,
): boolean => (
  homeScore !== null
  && awayScore !== null
  && (homeScore - awayScore) * (homeTeam - awayTeam) > 0
);

const isCorrectPromotion = (
  { homeWins, awayWins }: Bet,
  { matchday, score: { winner } }: Game,
): boolean => (
  matchday >= FIRST_PLAYOFF_DAY
  && ((winner === 'HOME_TEAM' && homeWins) || (winner === 'AWAY_TEAM' && awayWins))
);

const calculatePoints = (
  bet: Bet,
  game: Game | undefined,
  {
    differencePoints,
    playoffCoefficient,
    promotionPoints,
    resultPoints,
    scorePoints,
  }: Room,
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

  return points * coefficient;
};

export const getTotalScore = (items: TableGame[]) => (
  items.reduce((sum: number, item) => (sum + (item.points || 0)), 0)
);

const getMaxPossiblePoints = (
  { scorePoints, playoffCoefficient, promotionPoints }: Room,
  matchday: number,
) => (
  matchday >= FIRST_PLAYOFF_DAY
    ? (scorePoints + promotionPoints) * playoffCoefficient
    : scorePoints
);

const getMaxPoints = (table: RoomTableRow[], index: number) => table
  .reduce((result: number | null, row) => {
    const { points } = row.games[index];
    if (typeof points !== 'number') {
      return result;
    }

    return result === null || points > result
      ? points
      : result;
  }, null);

const getTrololoPoints = (
  table: RoomTableRow[],
  index: number,
  room: Room,
  matchday: number,
): number | null => {
  const maxPossiblePoints = getMaxPossiblePoints(room, matchday);

  const maxPoints = getMaxPoints(table, index);
  if (maxPoints === null) {
    return null;
  }

  const trololoPoints = maxPossiblePoints - maxPoints;
  if (trololoPoints >= 0) {
    return trololoPoints;
  }

  return 0;
};

export const addTrololo = (table: RoomTableRow[], games: Game[], room: Room): RoomTableRow[] => [
  ...table,
  {
    id: 'trololo',
    name: 'Trololo',
    bot: true,
    avatar: '/trollface.png',
    games: games.map((game, index) => ({
      points: getTrololoPoints(table, index, room, game.matchday),
      ...game,
    })),
    score: 0,
  },
];

interface RoomBetsByUser {
  [key: string]: {
    [key: string]: Bet
  };
}

export const getRoomBetsByUser = (room: Room, games: Game[]) => uniqWith(
  room.bets,
  (a, b) => a.game === b.game && a.owner === b.owner,
)
  .reduce((result: RoomBetsByUser, bet: Bet) => ({
    ...result,
    [bet.owner]: {
      ...result[bet.owner],
      [bet.game]: {
        bet,
        points: calculatePoints(bet, games.find((game) => game.id === bet.game), room),
      },
    },
  }), {});

export const makeATableWithPoints = (room: Room, games: Game[]): RoomTableRow[] => {
  const roomBetsByUser = getRoomBetsByUser(room, games);

  return room.players.items.map((player: Player) => ({
    id: player.user.id,
    name: `${player.user.firstName || ''} ${player.user.lastName || ''}`.trim(),
    games: games.map((game: Game) => ({
      started: new Date() > new Date(game.utcDate),
      ...roomBetsByUser[player.user.id]?.[game.id],
      ...game,
    })),
    score: 0,
  }));
};

export const addUnderdogBonus = (
  table: RoomTableRow[],
): RoomTableRow[] => (
  table.length > UNDERDOG_APPLICABLE_LENGTH
    ? table.map((row, index) => ({
      ...row,
      games: row.games
        .map((game, gameIndex) => {
          if ((
            typeof game.points === 'number'
            && game.points > 0
            && getMaxPoints(
              table.filter((otherRow, otherIndex) => otherIndex !== index),
              gameIndex,
            ) === 0
          )) {
            return {
              ...game,
              points: game.points + UNDERDOG_BONUS,
            };
          }
          return game;
        }),
    }))
    : table
);

export const sortByScore = (a: RoomTableRow, b: RoomTableRow) => (
  a.score > b.score ? -1 : 1
);

export const sortByDefault = (a: RoomTableRow, b: RoomTableRow, user: User | null) => (
  a.id === user?.id ? -1 : 1
);

export const addScore = (table: RoomTableRow[]) => table
  .map((row) => ({
    ...row,
    score: getTotalScore(row.games),
  }));

export const addSorting = (
  table: RoomTableRow[],
  sorting: Sorting,
  user: User | null,
) => table
  .sort((a, b) => (sorting === 'SCORE'
    ? sortByScore(a, b)
    : sortByDefault(a, b, user)
  ));

export const getTeamToPoints = (row: RoomTableRow) => {
  return row.games.reduce((result: { [key: string]: number }, game) => {
    if (!game.homeTeam.name || !game.awayTeam.name) {
      return result;
    }
    return {
      ...result,
      [game.homeTeam.name]: (result[game.homeTeam.name] || 0) + (game.points || 0),
      [game.awayTeam.name]: (result[game.awayTeam.name] || 0) + (game.points || 0),
    };
  }, {});
};
