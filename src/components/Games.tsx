import React, { useEffect } from 'react';
import Link from 'next/link';
import { createUseStyles } from 'react-jss';
import { Table, TableBody, TableCell, TableHead, TableRow, IconButton, Button } from '@material-ui/core';

import { materialLightBlue900, materialLightBlue500, headerHeight, pageIndent } from '../styles/constants';
import { useRecoilState, useRecoilValue } from 'recoil';
import {gamesState, roomsState} from '../recoil/states';

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
    justifyContent: 'flex-end'
  }
});

const Games = () => {
  const classes = useStyles();
  const [rooms, setRooms] = useRecoilState(roomsState);
  useEffect(() => {

  }, []);
  const games = useRecoilValue(gamesState);

  return (
    <div className={classes.root}>
      <div className={classes.subHeader}>
        <Link href="/create-room">
          <Button
            size="small"
            component="a"
            variant="outlined"
            color={rooms.length ? 'primary' : 'default'}
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
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default Games;
