import React, { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { DialogTitle } from '@material-ui/core';

import { createUseStyles } from 'react-jss';
import {
  Button, Dialog, DialogActions, DialogContent, Radio,
  FormControl, OutlinedInput, FormLabel
} from '@material-ui/core';
import { createBet } from '../../api';
import Spinner from '../Spinner';
import { Bet, Game } from '../../types';
import { FIRST_PLAYOFF_DAY } from '../../utils/pointsCalculation';

const useStyles = createUseStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  button: {
    '&&': {
      margin: [16, 0],
    },
    width: 300
  },
  formInput: {
    '&&': {
      flexDirection: 'row',
      alignItems: 'center',
      margin: [16, 0, 32],
    }
  },
  scoreInput: {
    '&&': {
      textAlign: 'center',
      padding: 8
    }
  },
  scoreInputWrapper: {
    '&&': {
      fontSize: 24,
      margin: [0, 16],
      width: 60,
      minWidth: 60
    }
  },
  scoreRow: {
    display: 'flex',
    alignItems: 'center',
  },
  flag: {
    boxShadow: [0, 0, 2, '#777'],
    height: 35,
    margin: [0, 12]
  }
});

interface BetDialogProps {
  bet?: Bet,
  game: Game,
  roomId: string,
  onClose: () => void,
  onSave: () => void
}

const BetDialog: FC<BetDialogProps> = ({
  roomId,
  bet = {},
  game,
  onClose,
  onSave
}) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [homeScore, setHome] = useState(bet.homeScore || '0');
  const [awayScore, setAway] = useState(bet.awayScore || '0');
  const [homeWins, setHomeWins] = useState(true);
  const [awayWins, setAwayWins] = useState(false);
  const { query: { id } } = useRouter();
  const isPlayoff = game.matchday >= FIRST_PLAYOFF_DAY;

  useEffect(() => {

  }, [id]);

  return (
    <Dialog open={!!game} onClose={onClose}>
      <DialogTitle>Place your bet</DialogTitle>
      <DialogContent>
        <form
          id="bet-form"
          onSubmit={e => {
            e.preventDefault();
            setLoading(true);
            createBet({
              homeScore: Number(homeScore),
              awayScore: Number(awayScore),
              game: game.id,
              roomId: roomId,
              homeWins: isPlayoff && homeWins,
              awayWins: isPlayoff && awayWins
            })
              .then(onSave)
              .catch(() => setLoading(false))
          }}
        >
          <div className={classes.scoreRow}>
            {isPlayoff && (
              <Radio
                checked={homeWins}
                onChange={() => {
                  setHomeWins(true);
                  setAwayWins(false);
                }}
              />
            )}
            <FormControl className={classes.formInput}>
              {game.homeTeam.icon && (
                <img src={game.homeTeam.icon} className={classes.flag} alt={game.homeTeam.name} />
              )}
              <div>
                <FormLabel htmlFor="home-input">{game.homeTeam.name || '¯\\_(ツ)_/¯'}</FormLabel>
              </div>
              <OutlinedInput
                inputProps={{
                  min: 0,
                  max: 99
                }}
                value={homeScore}
                onChange={e => setHome(Number(e.target.value).toString())}
                type="number"
                id="home-input"
                classes={{
                  root: classes.scoreInputWrapper,
                  input: classes.scoreInput
                }}
              />
            </FormControl>
            :
            <FormControl className={classes.formInput}>
              <OutlinedInput
                inputProps={{
                  min: 0,
                  max: 99
                }}
                value={awayScore}
                onChange={e => setAway(Number(e.target.value).toString())}
                classes={{
                  root: classes.scoreInputWrapper,
                  input: classes.scoreInput
                }}
                type="number"
                id="away-input"
              />
              <div>
                <FormLabel htmlFor="away-input">{game.awayTeam.name || '¯\\_(ツ)_/¯'}</FormLabel>
              </div>
              {game.awayTeam.icon && (
                <img src={game.awayTeam.icon} className={classes.flag} alt={game.awayTeam.name} />
              )}
            </FormControl>
            {isPlayoff && (
              <Radio
                checked={awayWins}
                onChange={() => {
                  setHomeWins(false);
                  setAwayWins(true);
                }}
              />
            )}
          </div>
        </form>
      </DialogContent>
      <DialogActions>
        <Button
          form="bet-form"
          onClick={onClose}
        >
          Close
        </Button>
        <Button
          form="bet-form"
          type="submit"
          color="primary"
          variant="contained"
          disabled={loading}
        >
          {loading && <Spinner size={24} />}
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BetDialog;
