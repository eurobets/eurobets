import jss from 'jss';
import preset from 'jss-preset-default';

import { fontFamily } from './constants';

jss.setup(preset());

export const globalSheet = jss.createStyleSheet({
  '@import': 'url(https://fonts.googleapis.com/css?family=Oswald|Roboto:300&subset=latin,cyrillic)',
  '@global': {
      body: {
        padding: 0,
        margin: 0,
        fontFamily: fontFamily,
      },
      'a': {
        textDecoration: 'none',
        color: 'inherit',
      }
    }
  }
);

globalSheet.attach();
