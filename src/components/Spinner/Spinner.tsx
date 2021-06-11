import { createUseStyles } from 'react-jss';
import { CircularProgress, CircularProgressProps } from '@material-ui/core';
import { FC } from 'react';

const useStyles = createUseStyles({
  root: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    margin: 'auto',
  },
});

const Spinner: FC<CircularProgressProps> = (props) => {
  const classes = useStyles();

  return <CircularProgress className={classes.root} {...props} />;
};

export default Spinner;
