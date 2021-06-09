import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { createUseStyles } from 'react-jss';
import grey from '@material-ui/core/colors/grey';
import { Table, TableBody, TableCell, TableHead, TableRow, Button, Input, Tooltip } from '@material-ui/core';
import Head from 'next/head';
import { FlagOutlined } from '@material-ui/icons';

import { useRecoilValue, useRecoilState } from 'recoil';
import { gamesState, userState, roomState } from '../../recoil/states';
import { selectRoomTable } from '../../recoil/selectors';
import { getRoom } from '../../api';
import BetDialog from '../BetDialog';
import BetCellContent from '../BetCellContent';
import { Bet, Game, TableGame, TableRow as TableRowType } from '../../types';

const useStyles = createUseStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  content: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'row',
    overflow: 'auto'
  },
  footer: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  input: {
    width: 700
  },
  headerCell: {
    display: 'flex',
    flexWrap: 'nowrap',
    whiteSpace: 'nowrap',
    justifyContent: 'center'
  },
  scrollable: {
    overflow: 'auto',
    flexGrow: 1
  },
  leftTable: {
    maxWidth: 250,
    minWidth: 250,
    borderRight: [1, 'solid', grey[300]]
  },
  rightTable: {
    maxWidth: 100,
    minWidth: 100,
    borderLeft: [1, 'solid', grey[300]]

  },
  icon: {
    height: 20,
    margin: [0, 8],
    boxShadow: [0, 0, 2, grey[300]]
  },
  list: {
    margin: [0, 0, 0, 24]
  },
  cell: {
    '&&': {
      padding: [0, 0],
      height: 52,
      minWidth: 100,
      position: 'relative',
    }
  },
  date: {
    '&&': {
      zIndex: 1,
      color: grey[500],
      position: 'absolute',
      top: -2,
      left: 0,
      right: 0,
      fontSize: 10,
      width: '100%'
    }
  },
  avatar: {
    maxHeight: 32,
    marginLeft: 16
  },
  userWrapper: {
    display: 'flex',
    alignItems: 'center'
  },
  flagDefault: {
    color: grey[500]
  }
});

type BetDialogInput = {
  game: Game,
  bet: Bet
} | undefined;

const RoomView = () => {
  const classes = useStyles();
  const [betDialog, setBetDialog] = useState<BetDialogInput>();
  const [inviteMode, setInviteMode] = useState(false);
  const user = useRecoilValue(userState);
  const { query: { id } } = useRouter();
  const games = useRecoilValue(gamesState);
  const [room, setRoom] = useRecoilState(roomState);
  const table = useRecoilValue(selectRoomTable);

  useEffect(() => {
    getRoom(id).then(setRoom);

    return () => setRoom(null);
  }, [id]);

  if (!room || !user || !table) {
    return null;
  }
  const {
    id: roomId,
    scorePoints,
    differencePoints,
    resultPoints,
    promotionPoints,
    playoffCoefficient,
    name
  } = room;

  return (
    <div className={classes.root}>
      <Head>
        <title>{name} — Euro 2020</title>
      </Head>
      <div className={classes.content}>
        <section>
          <Table className={classes.leftTable}>
            <TableHead>
              <TableRow>
                <TableCell className={classes.cell}>&nbsp;</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {table.map((player) => (
                <TableRow key={player.id}>
                  <TableCell className={classes.cell}>
                    <div className={classes.userWrapper}>
                      {player.name}
                      <img src={player.avatar} className={classes.avatar} />
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
                  <TableCell key={game.id} align="center" className={classes.cell}>
                    <Tooltip
                      title={
                        <div>
                          <div>{game.homeTeam.name || '?'} — {game.awayTeam.name || '?'}</div>
                          <div>{(new Date(game.utcDate)).toLocaleString()}</div>
                        </div>
                      }
                    >
                    <div className={classes.headerCell}>
                      {game.homeTeam.icon
                        ? <img className={classes.icon} src={game.homeTeam.icon} title={game.homeTeam.name}/>
                        : <FlagOutlined className={classes.flagDefault} />}
                      {game.score.fullTime.homeTeam}
                      {' : '}
                      {game.score.fullTime.awayTeam}
                      {game.awayTeam.icon
                        ? <img className={classes.icon} src={game.awayTeam.icon} title={game.awayTeam.name}/>
                        : <FlagOutlined className={classes.flagDefault} />}
                    </div>
                    </Tooltip>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {table.map((player: TableRowType) => (
                  <TableRow key={player.id}>
                    {player.games.map((game: TableGame) => {
                      return (
                        <TableCell key={game.id} align="center" className={classes.cell}>
                          <BetCellContent
                            points={game.points}
                            started={game.started}
                            onlyPoints={player.bot}
                            bet={game.bet}
                            onClick={user.id === player.id
                              ? () => setBetDialog({ game, bet: game.bet })
                              : undefined}
                          />
                        </TableCell>
                      )
                    })}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </section>
        <section>
          <Table className={classes.rightTable}>
            <TableHead>
              <TableRow>
                <TableCell align="center" className={classes.cell}>Score</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                table.map((player) => (
                  <TableRow key={player.id}>
                    <TableCell align="center" className={classes.cell}>
                      {player.score || 0}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </section>
      </div>
      <div className={classes.footer}>
        {!inviteMode
          ? <Button variant="outlined" onClick={() => setInviteMode(true)}>Show invite link</Button>
          : <Input
            readOnly
            autoFocus
            className={classes.input}
            onBlur={() => setInviteMode(false)}
            value={`https://${window.location.hostname}/join-room/${roomId}`}
          />
        }
        <ul className={classes.list}>
          <li>Points: {scorePoints}/{differencePoints}/{resultPoints}</li>
          <li>Promotion: +{promotionPoints}</li>
          <li>Playoff: x{playoffCoefficient}</li>
        </ul>
      </div>
      {betDialog && (
        <BetDialog
          {...betDialog}
          roomId={roomId}
          onClose={() => setBetDialog(undefined)}
          onSave={() => {
            getRoom(id).then(setRoom).then(() => setBetDialog(undefined));
          }}
        />
      )}
    </div>
  );
};

export default RoomView;
