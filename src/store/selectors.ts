import {selector} from 'recoil';
import { gamesState, roomState, sortingState, userState } from './atoms';
import uniqWith from 'lodash/uniqWith';

import { getTotalScore, addTrololo, getRoomBetsByUser } from '../utils/pointsCalculation';
import { Bet, Game, RoomTableRow, Player, User } from '../types';

const sortByScore = (a: RoomTableRow, b: RoomTableRow) => {
 return a.score > b.score ? -1 : 1
}

const sortByDefault = (a: RoomTableRow, b: RoomTableRow, user: User | null) => {
  return a.id === user?.id ? -1 : 1
}

export const selectRoomTable = selector({
  key: 'selectRoomTable', // unique ID (with respect to other atoms/selectors)
  get({ get }): RoomTableRow[] | null {
    const games = get(gamesState);
    const room = get(roomState);
    const sorting = get(sortingState);
    const user = get(userState);

    if (!room) {
      return null;
    }

    const roomBetsByUser = getRoomBetsByUser(room, games);
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

    return addTrololo(table, games, room)
      .sort((a, b) => sorting === 'SCORE'
        ? sortByScore(a, b)
        : sortByDefault(a, b, user)
      );
  },
});
