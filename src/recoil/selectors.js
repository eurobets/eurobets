import {selector} from 'recoil';
import {gamesStateKey, teamsStateKey} from './states';
const get = selector({
  key: 'charCountState', // unique ID (with respect to other atoms/selectors)
  get: ({get}) => {
    const text = get(textState);

    return text.length;
  },
});
