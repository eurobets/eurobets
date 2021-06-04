import jss from 'jss';
import preset from 'jss-preset-default';
import { materialLightBlue900, materialLightBlue500 } from './constants';

jss.setup(preset());

export const globalSheet = jss.createStyleSheet({
  '@import': 'url(https://fonts.googleapis.com/css?family=Oswald|Roboto:300&subset=latin,cyrillic)',
  '@global': {
      body: {
        padding: 0,
        margin: 0,
        fontFamily: 'Roboto'
      },
      'a': {
        textDecoration: 'none',
        color: materialLightBlue900,
        '&:hover': {
          color: materialLightBlue500
        }
      }
    }
  }
);

globalSheet.attach();
