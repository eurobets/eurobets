import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import { createUseStyles } from 'react-jss';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Input,
  IconButton,
  TableSortLabel, Link as MaterialLink,
} from '@material-ui/core';
import Head from 'next/head';
import { ArrowBack } from '@material-ui/icons';
import Link from 'next/link';

import { useRecoilValue, useRecoilState } from 'recoil';
import { gamesState, userState, roomState, sortingState } from '../../store/atoms';
import { selectRoomTable } from '../../store/selectors';
import { getRoom } from '../../api';
import BetDialog from '../BetDialog';
import BetCellContent from '../BetCellContent';
import { Game, TableGame, RoomTableRow, BaseBet } from '../../types';

import styles from './RoomView.styles';
import RoomHeaderCell from '../RoomHeaderCell';

const useStyles = createUseStyles(styles);

type BetDialogInput = {
  game: Game,
  bet?: BaseBet
} | undefined;

const RoomView = () => {
  const classes = useStyles();
  const [betDialog, setBetDialog] = useState<BetDialogInput>();
  const [inviteMode, setInviteMode] = useState(false);
  const user = useRecoilValue(userState);
  const { query: { id } } = useRouter();
  const games = useRecoilValue(gamesState);
  const [room, setRoom] = useRecoilState(roomState);
  const [sorting, setSorting] = useRecoilState(sortingState);
  const table = useRecoilValue(selectRoomTable);
  const nextGame = games?.find((game) => game.score.winner === null);
  const nextGameId = nextGame ? nextGame.id : null;

  const scrollIntoViewCallback = useCallback((element: HTMLElement) => {
    setTimeout(() => {
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', inline: 'center' });
      }
    });
  }, []);

  useEffect(() => {
    getRoom(id as string).then(setRoom);

    return () => setRoom(null);
  }, [id]);

  if (!room || !user || !table || !games) {
    return null;
  }

  const {
    id: roomId,
    scorePoints,
    differencePoints,
    resultPoints,
    promotionPoints,
    playoffCoefficient,
    name,
  } = room;

  return (
    <div className={classes.root}>
      <Head>
        <title>{`${name} — Euro 2020`}</title>
      </Head>
      <div className={classes.header}>
        <Link href="/">
          <IconButton size="small" className={classes.back} color="primary">
            <ArrowBack />
          </IconButton>
        </Link>
        <Link href={`/room-stats/${id}`}>
          <a>
            <MaterialLink component="span">Statistics</MaterialLink>
          </a>
        </Link>
      </div>
      <div className={classes.content}>
        <section>
          <Table className={classes.leftTable}>
            <TableHead>
              <TableRow>
                <TableCell className={classes.cell}>&nbsp;</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {table.map((row) => (
                <TableRow key={row.id}>
                  <TableCell className={classes.cell}>
                    <div className={classes.userWrapper}>
                      {row.name}
                      {row.avatar && <img src={row.avatar} className={classes.avatar} alt="avatar" />}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>
        <section className={classes.scrollable}>
          <Table>
            <TableHead>
              <TableRow>
                {games.map((game) => (
                  <RoomHeaderCell
                    {...game}
                    className={classes.cell}
                    key={game.id}
                    ref={game.id === nextGameId
                      ? scrollIntoViewCallback
                      : undefined}
                  />
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {table.map((row) => (
                <TableRow key={row.id}>
                  {row.games.map((game: TableGame) => (
                    <TableCell key={game.id} align="center" className={classes.cell}>
                      <BetCellContent
                        points={game.points}
                        started={game.started}
                        bot={row.bot}
                        bet={game.bet}
                        onClick={user.id === row.id
                          ? () => setBetDialog({ game, bet: game.bet })
                          : undefined}
                      />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>
        <section>
          <Table className={classes.rightTable}>
            <TableHead>
              <TableRow>
                <TableCell
                  align="center"
                  className={classes.cell}
                >
                  <TableSortLabel
                    hideSortIcon
                    active={sorting === 'SCORE'}
                    direction={sorting === 'SCORE' ? 'desc' : undefined}
                    onClick={() => setSorting(sorting === 'SCORE' ? 'DEFAULT' : 'SCORE')}
                  >
                    Score
                  </TableSortLabel>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                table.map((row: RoomTableRow) => (
                  <TableRow key={row.id}>
                    <TableCell align="center" className={classes.cell}>
                      {row.score || 0}
                    </TableCell>
                  </TableRow>
                ))
}
            </TableBody>
          </Table>
        </section>
      </div>
      <div className={classes.footer}>
        {!inviteMode
          ? <Button variant="outlined" onClick={() => setInviteMode(true)}>Show invite link</Button>
          : (
            <Input
              readOnly
              autoFocus
              className={classes.input}
              onBlur={() => setInviteMode(false)}
              value={`https://${window.location.hostname}/join-room/${roomId}`}
            />
          )}
        <ul className={classes.list}>
          <li>
            Points:
            {scorePoints}
            /
            {differencePoints}
            /
            {resultPoints}
          </li>
          <li>
            Promotion: +
            {promotionPoints}
          </li>
          <li>
            Playoff: x
            {playoffCoefficient}
          </li>
        </ul>
      </div>
      {betDialog && (
        <BetDialog
          {...betDialog}
          roomId={roomId}
          onClose={() => setBetDialog(undefined)}
          onSave={() => {
            getRoom(id as string).then(setRoom).then(() => setBetDialog(undefined));
          }}
        />
      )}
    </div>
  );
};

export default RoomView;
