import React, { FC } from 'react';
import cx from 'classnames';
import { createUseStyles } from 'react-jss';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';

const useStyles = createUseStyles({
  fail: {
    color: red[900]
  },
  success: {
    fontWeight: 'bold',
    color: green[700]
  }
});

const Points: FC = ({ children }) => {
  const classes = useStyles();
  if (typeof children !== 'number') {
    return null;
  }
  return (
    <div className={cx(children > 0 ? classes.success : classes.fail )}>
      {children}
    </div>
  );
};

export default Points;
