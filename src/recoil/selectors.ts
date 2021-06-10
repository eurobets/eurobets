import {selector} from 'recoil';
import { gamesState, roomState } from './states';
import uniqWith from 'lodash/uniqWith';

import { calculatePoints, getTotalScore, getTrololoPoints } from '../utils/pointsCalculation';
import { Bet, Game, Room, RoomTableRow, Player } from '../types';

const addTrololo = (table: RoomTableRow[], games: Game[], room: Room): RoomTableRow[] => {
  const gamesWithResults = games.map((game, index) => ({
    points: getTrololoPoints(table, index, room, game.matchday),
    ...game
  }));

  return [
    ...table,
    {
      id: 'txrololo',
      name: 'Trololo',
      bot: true,
      avatar: '/trollface.png',
      games: gamesWithResults,
      score: getTotalScore(gamesWithResults)
    }
  ];
};

interface RoomBetsByUser {
  [key: string]: {
    [key: string]: Bet
  };
}

export const selectRoomTable = selector({
  key: 'selectRoomTable', // unique ID (with respect to other atoms/selectors)
  get({ get }): RoomTableRow[] | null {
    const games = get(gamesState);
    const room = get(roomState);

    if (!room) {
      return null;
    }

    const roomBetsByUser = uniqWith(room.bets, (a, b) => a.game === b.game && a.owner === b.owner)
      .reduce((result: RoomBetsByUser, bet: Bet) => ({
        ...result,
        [bet.owner]: {
          ...result[bet.owner],
          [bet.game]: {
            bet,
            points: calculatePoints(bet, games.find(game => game.id === bet.game), room)
          }
        }
      }), {});

    const table = room.players.items.map((player: Player) => {
      const gamesWithResults = games.map((game: Game) => ({
        started: new Date() > new Date(game.utcDate),
        ...roomBetsByUser[player.user.id]?.[game.id],
        ...game
      }));
      return {
        id: player.user.id,
        name: `${player.user.firstName || ''} ${player.user.lastName || ''}`.trim(),
        games: gamesWithResults,
        score: getTotalScore(gamesWithResults)
      }
    });

    return addTrololo(table, games, room);
  },
});
