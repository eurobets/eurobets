import React, { FC } from 'react';
import CheckIcon from '@material-ui/icons/Check';
import cx from 'classnames';
import { createUseStyles } from 'react-jss';
import { Bet } from '../../types';

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

const BetText: FC<Bet> = ({
  homeScore,
  awayScore,
  homeWins,
  awayWins
}) => {
  const classes = useStyles();

  if (typeof homeScore !== 'number' || typeof awayScore !== 'number') {
    return <CheckIcon />;
  }

  return (
    <div className={classes.root}>
      <div className={cx(classes.text, homeWins && classes.homeWins, awayWins && classes.awayWins)}>
        {homeScore} : {awayScore}
      </div>
    </div>
  );
}

export default BetText;
