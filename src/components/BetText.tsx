import React from 'react';
import { Button, IconButton } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import cx from 'classnames';
import { createUseStyles } from 'react-jss';

interface Props {
  homeWins: boolean;
  homeScore?: number;
  awayScore?: number;
  awayWins: boolean;
}



const useStyles = createUseStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  text: {
    position: 'relative',
    '&::before': {
      display: 'none',
      position: 'absolute',
      content: '\'🚀\'',
    }
  },
  homeWins: {
    '&::before': {
      left: -20,
      display: 'block',
    }
  },
  awayWins: {
    '&::before': {
      right: -20,
      display: 'block',
    }
  }
});

const BetText = ({ homeScore, awayScore, homeWins, awayWins }: Props) => {
  const classes = useStyles();

  if (typeof homeScore !== 'number' || typeof awayScore !== 'number') {
    return <CheckIcon />;
  }

  return (
    <div className={classes.root}>
      <div
        className={cx(classes.text, homeWins && classes.homeWins, awayWins && classes.awayWins)}
      >
        {homeScore} : {awayScore}
      </div>
    </div>
  );
}

export default BetText;
