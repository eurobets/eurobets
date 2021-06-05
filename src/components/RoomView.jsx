import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import cx from 'classnames';
import { createUseStyles } from 'react-jss';
import { Table, TableBody, TableCell, TableHead, TableRow, IconButton, Button, Input } from '@material-ui/core';

import { materialLightBlue900, materialLightBlue500, headerHeight, pageIndent } from '../styles/constants';
import { useRecoilState, useRecoilValue } from 'recoil';
import { gamesState, roomsState, userState } from '../recoil/states';
import { getRoom } from '../api';
import BetDialog from './BetDialog';
import BetCellContent from './BetCellContent';

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
    flexWrap: 'nowrap'
  },
  scrollable: {
    overflow: 'auto',
    flexGrow: 1
  },
  leftTable: {
    maxWidth: 250,
    minWidth: 250,
    borderRight: [1, 'solid', '#efefef']
  },
  rightTable: {
    maxWidth: 100,
    minWidth: 100,
    borderLeft: [1, 'solid', '#efefef']

  },
  icon: {
    height: 20,
    margin: [0, 8],
    boxShadow: [0, 0, 2, '#777']
  },
  list: {
    margin: [0, 0, 0, 24]
  },
  betCell: {
    '&&': {
      padding: [0, 0],
      height: 52
    }
  }
});

const RoomView = () => {
  const classes = useStyles();
  const [room, setRoom] = useState();
  const [betDialog, setBetDialog] = useState(null);
  const [inviteMode, setInviteMode] = useState(false);
  const { id: userId } = useRecoilValue(userState);
  const { query: { id } } = useRouter();
  const games = useRecoilValue(gamesState);
  useEffect(() => {
    getRoom(id).then(setRoom);
  }, [id]);

  if (!room) {
    return null;
  }
  const { id: roomId, bets = [], players: { items: players = [] },
    scorePoints,
    differencePoints,
    resultPoints,
    promotionPoints,
    playoffCoefficient
  } = room || {};

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <Table className={classes.leftTable}>
          <TableHead>
            <TableRow>
              <TableCell>&nbsp;</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {players.map((player) => (
              <TableRow key={player.id}>
                <TableCell>{player.user.firstName} {player.user.lastName}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className={classes.scrollable}>
          <Table>
            <TableHead>
              <TableRow>
                {games.map((game) => (
                  <TableCell key={game.id} align="center">
                    <div className={classes.headerCell}>
                      <img className={classes.icon} src={game.homeTeam.icon} title={game.homeTeam.name} />
                      {game.score.fullTime.homeTeam}
                      {' : '}
                      {game.score.fullTime.awayTeam}
                      <img className={classes.icon} src={game.awayTeam.icon} title={game.awayTeam.name} />
                    </div>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {players.map((player) => (
                  <TableRow key={player.id}>
                    {games.map((game) => {
                        //@ts-ignore
                        const bet = bets.find((bet) => (bet.owner === player.user.id && game.id === Number(bet.game)))

                        return (
                        <TableCell key={game.id} align="center" className={classes.betCell}>
                          <BetCellContent
                            bet={bet}
                            mine={userId === player.user.id}
                            onClick={userId === player.owner ? () => setBetDialog({ game, bet }) : undefined}
                          />
                        </TableCell>
                      )
                    })}

                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
        <Table className={classes.rightTable}>
          <TableHead>
            <TableRow>
              <TableCell align="center">Score</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              //@ts-ignore
              players.map((player) => (
                <TableRow key={player.id}>
                  <TableCell align="center">{0}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
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
          onClose={() => setBetDialog(null)}
          onSave={() => {
            getRoom(id).then(setRoom).then(() => setBetDialog(null));
          }}
        />
      )}
    </div>
  );
};

export default RoomView;

/*
import _ from 'lodash';
import b from 'b_';
import React from 'react';
import { connect } from 'react-redux';
import {FormattedMessage, FormattedHTMLMessage, injectIntl} from 'react-intl';

import Spin from '../Spin/Spin.jsx';
import CellBet from '../BetsTable/Cell/CellBet.jsx';
import CellHeader from './Cell/CellHeader.jsx';

import { removeUser, setUsersSortingField } from '../../actions/rooms';
import { getTrololoPoints, getGamePoints } from '../../points';

import './BetsTable.scss';
import '../Flag/Flag.scss';

const BetsTable = React.createClass({
    propTypes: {
        teams: React.PropTypes.array,
        games: React.PropTypes.array,
        room: React.PropTypes.object,
        intl: React.PropTypes.object.isRequired
    },

    getInitialState() {
        return {
            hoveredRow: null
        };
    },

    componentDidMount() {
        if (this.props.games && this.props.games.some(game => game.actual)) {
            $('.bets-table__main-table-wrapper').scrollTo('.bets-table__cell_actual', 500);
        }
    },

    componentDidUpdate(prevProps) {
        const {games} = this.props;
        if (!prevProps.games.some(game => game.actual) && games.some(game => game.actual)) {
            $('.bets-table__main-table-wrapper').scrollTo('.bets-table__cell_actual', 500);
        }
    },

    removeUser(userId) {
        this.props.dispatch(removeUser({roomId: this.props.room._id, userId}));
    },

    onRowEnter(rowId) {
        this.setState({hoveredRow: rowId});
    },

    onRowLeave() {
        this.setState({hoveredRow: null});
    },

    toggleSortPoints() {
        this.props.dispatch(setUsersSortingField(this.props.room.sort === 'points' ? null : 'points'));
    },

    render() {
        const {
            points,
            games=[],
            loading,
            user,
            room,
            room: {users=[], rules={}, owner},
            bets={},
            betsStatus} = this.props;
        const {hoveredRow} = this.state;

        const iAmOwner = user.id === (!!owner && owner._id);

        return (
            <div className="bets-table">
                {loading && <Spin center />}
                <div className="bets-table__header-table-wrapper">
                    <div className="bets-table__header-table">
                        <div className="bets-table__row">
                            <div className={b('bets-table', 'cell', {header: true, first: true})} />
                        </div>
                        {users.map(user => (
                            <div
                                className={b('bets-table', 'row', {
                                    hovered: hoveredRow === user._id,
                                    charge: user.charge,
                                    bot: user.bot
                                })}
                                key={user._id}
                                onMouseEnter={this.onRowEnter.bind(this, user._id)}
                                onMouseLeave={this.onRowLeave}>
                                <div className="bets-table__cell">
                                    <div className="bets-table__username">
                                        {user.profile.name} {user.profile.lastName}
                                    </div>
                                    {!!user.bot &&
                                        <div className="bets-table__bot-description-control">
                                            <div className="bets-table__bot-description-popup">
                                                <FormattedMessage id={`Bots.${user.bot}Description`} />
                                            </div>
                                        </div>}
                                    {!!user.bot && iAmOwner &&
                                        <div
                                            onClick={this.removeUser.bind(this, user._id)}
                                            className="bets-table__remove-control" />}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="bets-table__main-table-wrapper">
                    <div className="bets-table__main-table">
                        <div className="bets-table__row">
                            {games.map((game, index) => (
                                <CellHeader
                                    key={`${game.matchday}_${game.homeTeamName}_${game.awayTeamName}_${index}`}
                                    game={game} />
                            ))}
                        </div>
                        {users.map(user => (
                            <div
                                className={b('bets-table', 'row', {hovered: hoveredRow === user._id})}
                                key={user._id}
                                onMouseEnter={this.onRowEnter.bind(this, user._id)}
                                onMouseLeave={this.onRowLeave}>
                                    {games.map((game, index) => (
                                        <CellBet
                                            bet={bets[user._id] && bets[user._id].games[game.id] || {}}
                                            points={points[user._id] && points[user._id][game.id]}
                                            betsStatus={betsStatus}
                                            key={game.id}
                                            userId={user._id}
                                            room={room}
                                            game={game} />
                                    ))}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="bets-table__overall-table-wrapper">
                    <div className="bets-table__overall-table">
                        <div className="bets-table__row">
                            <div
                                className={b('bets-table', 'cell', {
                                    header: true,
                                    points: true,
                                    sorted: room.sort === 'points'
                                })}
                                onClick={this.toggleSortPoints}>
                                    <FormattedMessage id="BetsTable.points" />
                            </div>
                        </div>
                        {users.map(user => (
                            <div className={b('bets-table', 'row', {hovered: hoveredRow === user._id})} key={user._id}>
                                <div className="bets-table__cell">
                                    {_.sum(_.values( points[user._id])) || 0}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
});

function mapStateToProps({room, games, games: {list=[], message}, bets, bets: {data, status: betsStatus}, user}) {
    const lastStartedGame = _.findLast(list, game => game.started === true);
    const lastStartedDate = lastStartedGame
        ? new Date(lastStartedGame.date).setHours(0, 0, 0, 0)
        : 0;

    // актуальные игры - игры, сыгранные за последние два дня
    const actualGames = list.filter(game =>
        lastStartedDate - new Date(game.date).setHours(0, 0, 0, 0) < 1000 * 48 * 60 * 60).map(game => game.id);

    list = list.map(game => {
        game.actual = actualGames.indexOf(game.id) > -1;
        return game;
    });

    room.users = room.users.map(user => {
        user.charge = room.chargeUsers && room.chargeUsers.includes(user._id);
        return user;
    });

    room.users = room.users
        .sort(({profile: a}, {profile: b}) => { // сортируем всех по алфавиту
            const nameA = `${a.name.toLowerCase()} ${a.lastName.toLowerCase()}`;
            const nameB = `${b.name.toLowerCase()} ${b.lastName.toLowerCase()}`;

            if (nameA < nameB)
                return -1;
            if (nameA > nameB)
                return 1;
            return 0;
        });

    // ботов в самый низ
    room.users =
        room.users
            .filter(u => !u.bot)
            .concat(room.users.filter(u => !!u.bot));

    // себя - наверх
    room.users = room.users
        .filter(u => u._id === user.id)
        .concat(room.users.filter(u => u._id !== user.id));

    // на деньги - наверх
    room.users =
        room.users
            .filter(u => u.charge)
            .concat(room.users.filter(u => !u.charge));

    let points = {};
    const gamesMaxPoints = {};

    if (data && room.users) {
        room.users
            .forEach(u => {
                const userPoints = data[u._id] && data[u._id].games;

                points[u._id] = userPoints
                    ? _.mapValues(userPoints, ((g, gameId) => {
                        const game = list.find(game => game.id === gameId) || {};
                        const gamePoint = g && g.result
                            ? getGamePoints(g.result, room.rules.points, game.matchday)
                            : null;
                        if (u.charge && (!gamesMaxPoints[gameId] || gamesMaxPoints[gameId] < gamePoint)) {
                            gamesMaxPoints[gameId] = gamePoint;
                        }

                        return gamePoint;
                    }))
                    : {};
            });

        const trololo = room.users.find(u => u.bot === 'trololo');

        if (trololo) {
            points = getTrololoPoints(trololo, points, gamesMaxPoints, room.rules, games.list);
        }
    }

    if (room.sort === 'points') {
        room.users.sort((a, b) => {
            const overallA = _.sum(_.values(points[a._id]));
            const overallB = _.sum(_.values(points[b._id]));

            if (overallA < overallB) {
                return 1;
            }

            if (overallA > overallB) {
                return -1;
            }

            return 0;
        });
    }

    return {
        points,
        user,
        games: list,
        message,
        bets: data,
        loading: betsStatus.loading || room.loading || games.loading,
        room,
        betsStatus
    };
}

export default connect(mapStateToProps)(injectIntl(BetsTable));

 */
