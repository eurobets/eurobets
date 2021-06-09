import {atom} from 'recoil';

export const gamesState = atom({
  key: 'gamesState',
  default: [],
});

export const roomState = atom({
  key: 'roomState',
  default: null,
});

export const userState = atom({
  key: 'userState',
  default: null,
});
