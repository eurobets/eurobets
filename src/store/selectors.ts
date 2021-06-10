import {selector} from 'recoil';
import { gamesState, roomState } from './atoms';
import uniqWith from 'lodash/uniqWith';

import { getTotalScore, addTrololo, getRoomBetsByUser } from '../utils/pointsCalculation';
import { Bet, Game, RoomTableRow, Player } from '../types';

export const selectRoomTable = selector({
  key: 'selectRoomTable', // unique ID (with respect to other atoms/selectors)
  get({ get }): RoomTableRow[] | null {
    const games = get(gamesState);
    const room = get(roomState);

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

    return addTrololo(table, games, room);
  },
});
