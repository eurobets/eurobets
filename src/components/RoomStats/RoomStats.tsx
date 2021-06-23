import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { createUseStyles } from 'react-jss';
import { ResponsiveLine } from '@nivo/line'
import Head from 'next/head';

import { useRecoilValue, useRecoilState } from 'recoil';
import { gamesState, userState, roomState, lastNGames } from '../../store/atoms';
import { selectStatsTable } from '../../store/selectors';
import { getRoom } from '../../api';

import styles from './RoomStats.styles';
import Link from 'next/link';
import { IconButton, TextField } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';

const useStyles = createUseStyles(styles);

const RoomStats = () => {
  const classes = useStyles();
  const user = useRecoilValue(userState);
  const { query: { id } } = useRouter();
  const games = useRecoilValue(gamesState);
  const [room, setRoom] = useRecoilState(roomState);
  const [lastGames, setLastGames] = useRecoilState(lastNGames);
  const stats = useRecoilValue(selectStatsTable);

  useEffect(() => {
    getRoom(id as string).then(setRoom);

    return () => setRoom(null);
  }, [id]);

  if (!room || !user || !stats || !games) {
    return null;
  }

  const { name } = room;

  return (
    <div className={classes.root}>
      <Head>
        <title>{`Stats — ${name} — Euro 2020`}</title>
      </Head>
      <div>
        <Link href={`/rooms/${id}`}>
          <IconButton size="small" color="primary">
            <ArrowBack />
          </IconButton>
        </Link>
      </div>
      <TextField
        style={{ width: 200 }}
        label="Series of N games"
        onChange={(e) => setLastGames(Number(e.target.value) || null)}
        value={lastGames === null ? '' : lastGames}
        type="number"
      />
      <div className={classes.content}>
        {/* @ts-ignore */}
        <ResponsiveLine
          data={stats}
          margin={{ top: 50, right: 200, bottom: 50, left: 60 }}
          xScale={{ type: 'point' }}
          yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: false, reverse: false }}
          yFormat=" >-.2f"
          curve="monotoneX"
          axisTop={null}
          axisRight={null}
          axisBottom={{
            orient: 'bottom',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'game',
            legendOffset: 36,
            legendPosition: 'middle'
          }}
          axisLeft={{
            orient: 'left',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'points',
            legendOffset: -40,
            legendPosition: 'middle'
          }}
          colors={{ scheme: 'set2' }}
          pointSize={4}
          pointColor={{ theme: 'background' }}
          pointBorderWidth={2}
          pointBorderColor={{ from: 'serieColor', modifiers: [] }}
          pointLabelYOffset={-15}
          areaOpacity={0.8}
          enablePoints={false}
          enableSlices="x"
          useMesh={true}
          sliceTooltip={({ slice }) => {
            return (
              <div
                style={{
                  background: 'white',
                  padding: '9px 12px',
                  border: '1px solid #ccc',
                }}
              >
                {slice.points
                  .sort((a, b) => (a.data.y > b.data.y ? -1 : 1))
                  .map((point) => (
                    <div
                      style={{ display: 'flex', fontSize: 12 }}
                      key={point.id}
                    >
                      <div style={{ width: 140 }}>
                        {point.serieId}
                      </div>
                      <div
                        style={{
                          color: point.serieColor,
                          padding: '2px 0',
                        }}
                      >
                        <strong>{point.data.y}</strong>
                      </div>
                    </div>
                  ))}
              </div>
            )
          }}
          legends={[
            {
              anchor: 'bottom-right',
              direction: 'column',
              justify: false,
              translateX: 160,
              translateY: 0,
              itemsSpacing: 0,
              itemDirection: 'left-to-right',
              itemWidth: 140,
              itemHeight: 20,
              itemOpacity: 0.75,
              symbolSize: 12,
              symbolShape: 'circle',
              symbolBorderColor: 'rgba(0, 0, 0, .5)',
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemBackground: 'rgba(0, 0, 0, .03)',
                    itemOpacity: 1
                  }
                }
              ]
            }
          ]}
        />
      </div>
    </div>
  );
};

export default RoomStats;
