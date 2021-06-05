import React, { useEffect, useState } from 'react';
import router, { useRouter } from 'next/router';
import Link from 'next/link';

import { createUseStyles } from 'react-jss';
import { Button, Typography, TextField, Dialog, DialogActions, DialogContent, Radio } from '@material-ui/core';
import { useRecoilState } from 'recoil';
import { userState } from '../recoil/states';
import { createBet } from '../api';
import Spinner from './Spinner';

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
  }
});
const BetDialog = ({ roomId, bet = {}, game, onClose, onSave }) => {
  const classes = useStyles();
  const [user] = useRecoilState(userState);
  const [homeScore, setHome] = useState(bet.homeScore || 0);
  const [awayScore, setAway] = useState(bet.awayScore || 0);
  const [homeWins, setHomeWins] = useState(true);
  const [awayWins, setAwayWins] = useState(false);
  const { query: { id } } = useRouter();
  const isPlayoff = game.matchday >= 4;

  useEffect(() => {

  }, [id]);

  return (
    <Dialog open={!!game} onClose={onClose}>
      <DialogContent>
        <form
          id="bet-form"
          onSubmit={e => {
            e.preventDefault();
            createBet({
              homeScore,
              awayScore,
              game: game.id,
              roomId: roomId,
              homeWins: isPlayoff && homeWins,
              awayWins: isPlayoff && awayWins
            }).then(onSave)
          }}
        >
          {isPlayoff && (
            <Radio
              checked={homeWins}
              onChange={() => {
                setHomeWins(true);
                setAwayWins(false);
              }}
            />
          )}
          <TextField
            value={homeScore}
            label={game.homeTeam.name || '¯\\_(ツ)_/¯'}
            onChange={e => setHome(Number(e.target.value))}
            type="number"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            value={awayScore}
            label={game.awayTeam.name || '¯\\_(ツ)_/¯'}
            onChange={e => setAway(Number(e.target.value))}
            type="number"
            InputLabelProps={{ shrink: true }}
          />
          {isPlayoff && (
            <Radio
              checked={awayWins}
              onChange={() => {
                setHomeWins(false);
                setAwayWins(true);
              }}
            />
          )}
        </form>
      </DialogContent>
      <DialogActions>
        <Button
          form="bet-form"
          type="submit"
          color="primary"
          variant="contained"
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BetDialog;
