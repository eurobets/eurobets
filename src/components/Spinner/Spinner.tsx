import { createUseStyles } from 'react-jss';
import { CircularProgress, CircularProgressProps } from '@material-ui/core';

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

const Spinner = (props: CircularProgressProps) => {
  const classes = useStyles();

  return <CircularProgress className={classes.root} {...props} />;
}

export default Spinner;
