import React, { useState } from 'react';
import Link from 'next/link';
import cx from 'classnames';

import { createUseStyles } from 'react-jss';
import { Table, TableBody, TableCell, TableHead, TableRow, Button, Link as MaterialLink } from '@material-ui/core';
import grey from '@material-ui/core/colors/grey';
import { useRecoilState, useRecoilValue } from 'recoil';

import { gamesState, userState } from '../../store/atoms';
import { Bet, Game, Player } from '../../types';
import BetCellContent from '../BetCellContent';
import BetDialog from '../BetDialog';
import { getUser } from '../../api';

const useStyles = createUseStyles({
  root: {},
  subHeader: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  table: {
    '&&': {
      width: 'auto',
    },
  },
  menuItem: {
    marginRight: 36,
  },
  dateCell: {
    width: 200,
  },
  gameCell: {
    width: 200,
  },
  scoreCell: {
    width: 100,
  },
  betCell: {
    width: 100,
    borderLeft: [1, 'solid', grey[300]],
  },
  roomHeaderCell: {
    whiteSpace: 'nowrap',
  },
  hidden: {
    '&&': {
      display: 'none'
    }
  }
});

type BetDialogInput = {
  game: Game,
  bet?: Bet,
  roomId: string
} | undefined;

const Dashboard = () => {
  const classes = useStyles();
  const games = useRecoilValue(gamesState);
  const [user, setUser] = useRecoilState(userState);
  const [betDialog, setBetDialog] = useState<BetDialogInput>();
  const [showAll, setShowAll] = useState(false);
  if (!user || games.length === 0) {
    return null;
  }
  const { id, players: { items: players = [] } } = user;
  const lastMidnight = new Date();
  lastMidnight.setHours(0, 0, 0, 0);

  async function onSave() {
    try {
      const response = await getUser(id);
      setUser(response);
      setBetDialog(undefined);
    } catch (err) {
      console.log('error fetching user', err);
    }
  }

  return (
    <div className={classes.root}>
      <div className={classes.subHeader}>
        <div>
          {players.map((player: any) => (
            <Link href={`/rooms/${player.room.id}`} key={player.id}>
              <a className={classes.menuItem}>
                <MaterialLink component="span">{player.room.name}</MaterialLink>
              </a>
            </Link>
          ))}
        </div>
        <Link href="/create-room">
          <Button
            size="small"
            component="a"
            variant="outlined"
            color={players.length ? 'primary' : 'default'}
          >
            Create room
          </Button>
        </Link>
      </div>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell />
            <TableCell align="center">
              Score
            </TableCell>
            {players.map((player: Player) => (
              <TableCell key={player.id} className={classes.roomHeaderCell} align="center">
                <Link href={`/rooms/${player.room.id}`} key={player.id}>
                  <a>
                    <MaterialLink component="span">{player.room.name}</MaterialLink>
                  </a>
                </Link>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {!showAll && (
            <TableRow>
              <TableCell colSpan={3 + players.length}>
                <MaterialLink href="#" color="primary" onClick={() => setShowAll(true)}>
                  Show previous games
                </MaterialLink>
              </TableCell>
            </TableRow>
          )}
          {games.map((game: Game) => {
            const gameStart = new Date(game.utcDate);
            const started = new Date() > gameStart;
            const hideByDefault = lastMidnight > gameStart;
            return (
              <TableRow key={game.id} className={cx(hideByDefault && !showAll && classes.hidden)}>
                <TableCell className={classes.dateCell}>
                  {gameStart.toLocaleString()}
                </TableCell>
                <TableCell className={classes.gameCell}>
                  {game.homeTeam.name || '?'}
                  {' — '}
                  {game.awayTeam.name || '?'}
                </TableCell>
                <TableCell align="center" className={classes.scoreCell}>
                  {typeof game.score.fullTime.homeTeam === 'number' ? game.score.fullTime.homeTeam : '-'}
                  {' : '}
                  {typeof game.score.fullTime.awayTeam === 'number' ? game.score.fullTime.awayTeam : '-'}
                </TableCell>
                {players.map((player: Player) => {
                  const bet = player.room.bets.find((item: Bet) => (
                    item.owner === user?.id
                    && item.roomId === player.room.id
                    && game.id === Number(item.game)
                  ));

                  return (
                    <TableCell key={player.id} align="center" className={classes.betCell}>
                      <BetCellContent
                        bet={bet}
                        started={started}
                        onClick={() => setBetDialog({ game, bet, roomId: player.room.id })}
                      />
                    </TableCell>
                  );
                })}
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
      {betDialog && (
        <BetDialog
          {...betDialog}
          onClose={() => setBetDialog(undefined)}
          onSave={onSave}
        />
      )}
    </div>
  );
};

export default Dashboard;
