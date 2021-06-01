import jss from 'jss';
import preset from 'jss-preset-default';

jss.setup(preset())

jss.createStyleSheet({
  '@import': 'url(https://fonts.googleapis.com/css?family=Oswald|Roboto:300&subset=latin,cyrillic)',
  '@global': {
      body: {
        padding: 0,
        margin: 0,
      },
      'a': {
        textDecoration: 'none',
        color: 'inherit'
      }
    }
  }
).attach();
