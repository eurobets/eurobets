import { createUseStyles } from 'react-jss';
import { CircularProgress } from '@material-ui/core';

const useStyles = createUseStyles({
  root: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    margin: 'auto'
  },
});

const Spinner = () => {
  const classes = useStyles();

  return <CircularProgress className={classes.root} />;
}

export default Spinner;
