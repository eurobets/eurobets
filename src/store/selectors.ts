import { selector } from 'recoil';
import { gamesState, roomState, sortingState, userState } from './atoms';

import {
  addSorting, addTrololo, /* addUnderdogBonus, */ makeATableWithPoints, addScore,
} from '../utils/pointsCalculation';
import { RoomTableRow, StatsRow } from '../types';

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

    let table = makeATableWithPoints(room, games);
    // table = addUnderdogBonus(table);
    table = addTrololo(table, games, room);
    table = addScore(table);
    return addSorting(table, sorting, user);
  },
});

export const selectStatsTable = selector({
  key: 'selectStatsTable',
  get({ get }): StatsRow[] | null {
    const table = get(selectRoomTable);

    if (!table) {
      return null;
    }

    const sortedByScore = addSorting([...table], 'SCORE', null).reverse();

    const result = sortedByScore.map((row) => ({
      id: row.name,
      data: row.games
        .filter((game) => game.status !== 'SCHEDULED')
        .map((game, index) => ({
          x: index + 1,
          y: row.games.reduce((sum, prevGame, prevIndex) => (
            prevIndex <= index
              ? sum + (prevGame.points || 0)
              : sum
          ), 0),
        })),
    }));

    return result;
  },
});
