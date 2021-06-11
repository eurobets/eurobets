import { selector } from 'recoil';
import { gamesState, roomState, sortingState, userState } from './atoms';

import {
  addSorting, addTrololo, /* addUnderdogBonus, */ makeATableWithPoints, addScore,
} from '../utils/pointsCalculation';
import { RoomTableRow } from '../types';

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
