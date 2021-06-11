import React from 'react';
import Link from 'next/link';

import { createUseStyles } from 'react-jss';
import { Table, TableBody, TableCell, TableHead, TableRow, Button, Link as MaterialLink } from '@material-ui/core';
import grey from '@material-ui/core/colors/grey';
import { useRecoilValue } from 'recoil';

import { gamesState, userState } from '../../store/atoms';
import { Bet, Game, Player } from '../../types';
import BetCellContent from '../BetCellContent';

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
});

const Dashboard = () => {
  const classes = useStyles();
  const games = useRecoilValue(gamesState);
  const user = useRecoilValue(userState);
  if (!user || games.length === 0) {
    return null;
  }
  const { bets: { items: bets = [] }, players: { items: players = [] } } = user;

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
          {games.map((game: Game) => (
            <TableRow key={game.id}>
              <TableCell className={classes.dateCell}>
                {(new Date(game.utcDate)).toLocaleString()}
              </TableCell>
              <TableCell className={classes.gameCell}>
                {game.homeTeam.name || '?'}
                {' — '}
                {game.awayTeam.name || '?'}
              </TableCell>
              <TableCell align="center" className={classes.scoreCell}>
                {game.score.fullTime.homeTeam || '-'}
                {' : '}
                {game.score.fullTime.awayTeam || '-'}
              </TableCell>
              {players.map((player: Player) => {
                const bet = player.room.bets.find((item: Bet) => (
                  item.owner === user?.id
                  && item.roomId === player.room.id
                  && game.id === Number(item.game)
                ));

                return (
                  <TableCell key={player.id} align="center" className={classes.betCell}>
                    <BetCellContent bet={bet} />
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Dashboard;
