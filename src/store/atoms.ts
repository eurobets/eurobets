import { atom } from 'recoil';
import { User, Room, Game, Sorting } from '../types';

export const gamesState = atom<Game[]>({
  key: 'gamesState',
  default: [],
});

export const roomState = atom<Room | null>({
  key: 'roomState',
  default: null,
});

export const userState = atom<User | null>({
  key: 'userState',
  default: null,
});

export const sortingState = atom<Sorting>({
  key: 'sortingState',
  default: 'DEFAULT',
});
