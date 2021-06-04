import {atom} from 'recoil';

export const gamesState = atom({
  key: 'gamesState',
  default: null,
});

export const roomsState = atom({
  key: 'roomsState',
  default: [],
});

export const userState = atom({
  key: 'userState',
  default: null,
});
