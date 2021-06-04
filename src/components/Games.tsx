import React, { useEffect } from 'react';
import Link from 'next/link';
import { createUseStyles } from 'react-jss';
import { Table, TableBody, TableCell, TableHead, TableRow, IconButton, Button } from '@material-ui/core';

import { materialLightBlue900, materialLightBlue500, headerHeight, pageIndent } from '../styles/constants';
import { useRecoilState, useRecoilValue } from 'recoil';
import { gamesState, roomsState, userState } from '../recoil/states';
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
  menuItem: {
    marginRight: 36
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
            <Link href={`/rooms/${player.room.id}`}><a className={classes.menuItem}>{player.room.name}</a></Link>
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
      <Table>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Game</TableCell>
            <TableCell>Score</TableCell>
            {players.map((player: any) => (
              <TableCell key={player.id}>
                <Link href={`/rooms/${player.room.id}`}><a>{player.room.name}</a></Link>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {(games || []).map((game: Game) => {
            console.log(game);
            return (
              <TableRow key={game.id}>
                <TableCell>{(new Date(game.utcDate)).toLocaleString()}</TableCell>
                <TableCell>{game.homeTeam.name || '?'} — {game.awayTeam.name || '?'}</TableCell>
                <TableCell>{game.score.fullTime.homeTeam || '-'} : {game.score.fullTime.awayTeam || '-'}</TableCell>
                {players.map((player: any) => {
                  console.log(game.id, bets);

                  const bet = bets.find((bet: { userId: string; roomId: string; }) => (
                      //@ts-ignore
                    bet.userId === user.id && bet.roomId === player.room.id && game.id === Number(bet.game)))

                    return (
                      <TableCell key={player.id}>
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
