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
  content: {
    display: 'flex',
    flexWrap: 'nowrap',
    whiteSpace: 'nowrap',
    justifyContent: 'center',
  },
  icon: {
    height: 20,
    margin: [0, 8],
    boxShadow: [0, 0, 2, grey[300]],
  },
  flagDefault: {
    color: grey[500],
  },
  score: {
    position: 'relative',
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
  loser: {
    opacity: 0.4,
  }
};
