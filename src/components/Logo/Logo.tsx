import cx from 'classnames';
import React, { FC } from 'react';

import { createUseStyles } from 'react-jss';
import { fontFamilyOswald } from '../../styles/constants';

interface LogoProps {
  className?: string;
}

const useStyles = createUseStyles({
  root: {
    fontFamily: fontFamilyOswald,
    fontSize: '24px',
    letterSpacing: '.7px',
    textTransform: 'uppercase',
    color: 'white'
  }
});

const Logo: FC<LogoProps> = ({ className }) => {
  const classes = useStyles();

  return (
    <span className={cx(classes.root, className)}>Euro 2020</span>
  );
};

export default Logo;
