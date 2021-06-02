import cx from 'classnames';
import React from 'react';

import { createUseStyles } from 'react-jss';
import { materialGreen700, colorWhite } from '../../styles/constants';

interface Props {
  message: string;
  type: string;
}

const useStyles = createUseStyles({
  root: {
    padding: [12, 0],
    textAlign: 'center',
  },
  success: {
    backgroundColor: materialGreen700,
    color: colorWhite,
  }
});

const Notification = ({ message, type }: Props) => {
  const classes = useStyles();

  return (
    <div className={cx(classes.root, type === 'SUCCESS' && classes.success )}>{message}</div>
  );
};

export default Notification;
