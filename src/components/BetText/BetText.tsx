import React, { FC } from 'react';
import CheckIcon from '@material-ui/icons/Check';
import { createUseStyles } from 'react-jss';
import { BaseBet } from '../../types';

const useStyles = createUseStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  text: {
    position: 'relative',
  },
  homeWins: {
    position: 'absolute',
    left: -20,
  },
  awayWins: {
    position: 'absolute',
    right: -20,
  },
});

const BetText: FC<BaseBet> = ({
  homeScore,
  awayScore,
  homeWins,
  awayWins,
}) => {
  const classes = useStyles();

  if (typeof homeScore !== 'number' || typeof awayScore !== 'number') {
    return <CheckIcon data-testid="bet-placed" />;
  }

  return (
    <div className={classes.root}>
      <div className={classes.text}>
        {homeWins && <span data-testid="home-wins" className={classes.homeWins}>🚀</span>}
        {homeScore}
        {' : '}
        {awayScore}
        {awayWins && <span data-testid="away-wins" className={classes.awayWins}>🚀</span>}
      </div>
    </div>
  );
};

export default BetText;
