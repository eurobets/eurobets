import React, { useEffect } from 'react';
import Link from 'next/link';
import { Link as MaterialLink } from '@material-ui/core';

import { createUseStyles } from 'react-jss';
import { Table, TableBody, TableCell, TableHead, TableRow, IconButton, Button } from '@material-ui/core';

import { useRecoilValue } from 'recoil';
import { gamesState, userState } from '../recoil/states';
import BetCellContent from './BetCellContent';

type Game = {
  id: string;
  utcDate: string;
  score: {
    fullTime: {
      homeTeam: number;
      awayTeam: number;
    };
  }
  homeTeam: {
    name: string;
  }
  awayTeam: {
    name: string;
  }
}

const useStyles = createUseStyles({
  root: {},
  subHeader: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  table: {
    '&&': {
      width: 'auto'
    },
  },
  menuItem: {
    marginRight: 36
  },
  dateCell: {
    width: 200
  },
  gameCell: {
    width: 200
  },
  scoreCell: {
    width: 100,
  },
  betCell: {
    width: 100,
    borderLeft: [1, 'solid', '#dadada']
  },
  roomHeaderCell: {
    whiteSpace: 'nowrap',
  }
});

const Games = () => {
  const classes = useStyles();
  useEffect(() => {

  }, []);
  const games = useRecoilValue(gamesState);
  const user = useRecoilValue(userState);
  // @ts-ignore
  const { bets: { items: bets = [] }, players: { items: players = [] } } = useRecoilValue(userState);

  return (
    <div className={classes.root}>
      <div className={classes.subHeader}>
        <div>
          {players.map((player: any) => (
            <Link href={`/rooms/${player.room.id}`} key={player.id}>
              <a className={classes.menuItem}>
                <MaterialLink>{player.room.name}</MaterialLink>
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
            {players.map((player: any) => (
              <TableCell key={player.id} className={classes.roomHeaderCell} align="center">
                <Link href={`/rooms/${player.room.id}`} key={player.id}>
                  <a>
                    <MaterialLink>{player.room.name}</MaterialLink>
                  </a>
                </Link>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {games.map((game: Game) => {
            return (
              <TableRow key={game.id}>
                <TableCell className={classes.dateCell}>{(new Date(game.utcDate)).toLocaleString()}</TableCell>
                <TableCell className={classes.gameCell}>{game.homeTeam.name || '?'} — {game.awayTeam.name || '?'}</TableCell>
                <TableCell align="center" className={classes.scoreCell}>
                  {game.score.fullTime.homeTeam || '-'} : {game.score.fullTime.awayTeam || '-'}
                </TableCell>
                {players.map((player: any) => {
                  const bet = bets.find((bet: { userId: string; roomId: string; }) => (
                      //@ts-ignore
                    bet.owner === user.id && bet.roomId === player.room.id && game.id === Number(bet.game)))

                    return (
                      <TableCell key={player.id} align="center" className={classes.betCell}>
                        <BetCellContent bet={bet} />
                      </TableCell>
                    );
                })}
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default Games;
