import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { createUseStyles } from 'react-jss';
import Head from 'next/head';
import Link from 'next/link';
import { IconButton, Tabs, Tab } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';

import { useRecoilValue, useRecoilState } from 'recoil';
import { gamesState, userState, roomState } from '../../store/atoms';
import { selectStatsTable } from '../../store/selectors';
import { getRoom } from '../../api';
import ProgressChart from '../ProgressChart';
import FavoriteChart from '../FavoriteChart';
import styles from './RoomStats.styles';

const useStyles = createUseStyles(styles);

const RoomStats = () => {
  const classes = useStyles();
  const [currentView, setCurrentView] = useState('progress');
  const user = useRecoilValue(userState);
  const { query: { id } } = useRouter();
  const games = useRecoilValue(gamesState);
  const [room, setRoom] = useRecoilState(roomState);

  useEffect(() => {
    getRoom(id as string).then(setRoom);

    return () => setRoom(null);
  }, [id]);

  if (!room || !user || !games) {
    return null;
  }

  const { name } = room;

  return (
    <div className={classes.root}>
      <Head>
        <title>{`Stats — ${name} — Euro 2020`}</title>
      </Head>
      <div className={classes.header}>
        <Link href={`/rooms/${id}`}>
          <IconButton size="small" color="primary">
            <ArrowBack />
          </IconButton>
        </Link>
        <Tabs
          className={classes.tabs}
          value={currentView}
          onChange={(e, newValue) => setCurrentView(newValue)}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Progress chart" value="progress" />
          <Tab label="Favorite teams" value="favorite" />
        </Tabs>
      </div>
      {currentView === 'progress' && <ProgressChart />}
      {currentView === 'favorite' && <FavoriteChart />}
    </div>
  );
};

export default RoomStats;
