import grey from '@material-ui/core/colors/grey';
import green from '@material-ui/core/colors/green';

export default {
  '@keyframes live-animation': {
    '0%': {
      transform: 'translateX(-8px)',
    },
    '50%': {
      transform: 'translateX(8px)',
    },
    '100%': {
      transform: 'translateX(-8px)',
    },
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  content: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'row',
    overflow: 'auto',
  },
  footer: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingTop: 16,
  },
  input: {
    width: 700,
  },
  headerCell: {
    display: 'flex',
    flexWrap: 'nowrap',
    whiteSpace: 'nowrap',
    justifyContent: 'center',
  },
  scrollable: {
    overflow: 'auto',
    flexGrow: 1,
  },
  leftTable: {
    maxWidth: 250,
    minWidth: 250,
    borderRight: [1, 'solid', grey[300]],
  },
  rightTable: {
    maxWidth: 100,
    minWidth: 100,
    borderLeft: [1, 'solid', grey[300]],

  },
  icon: {
    height: 20,
    margin: [0, 8],
    boxShadow: [0, 0, 2, grey[300]],
  },
  list: {
    margin: [0, 0, 0, 24],
  },
  cell: {
    '&&': {
      padding: [0, 0],
      height: 52,
      minWidth: 120,
      position: 'relative',
    },
  },
  date: {
    '&&': {
      zIndex: 1,
      color: grey[500],
      position: 'absolute',
      top: -2,
      left: 0,
      right: 0,
      fontSize: 10,
      width: '100%',
    },
  },
  avatar: {
    maxHeight: 32,
    marginLeft: 16,
  },
  userWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  flagDefault: {
    color: grey[500],
  },
  score: {
    position: 'relative',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
  },
  back: {
    '&&': {
      marginRight: 20,
    },
  },
  live: {
    animationName: '$live-animation',
    animationDuration: '1500ms',
    animationIterationCount: 'infinite',
    position: 'absolute',
    color: green[500],
    left: 0,
    right: 0,
    top: -16,
    margin: 'auto',
    fontSize: '12px',
    fontWeight: 'bold',
  },
};
