import React from 'react';
import { createUseStyles } from 'react-jss';
import { ResponsiveLine } from '@nivo/line';
import { TextField } from '@material-ui/core';

import { useRecoilValue, useRecoilState } from 'recoil';
import { lastNGames } from '../../store/atoms';
import { selectStatsTable } from '../../store/selectors';

import styles from './ProgressChart.styles';

const useStyles = createUseStyles(styles);

const RoomStats = () => {
  const classes = useStyles();
  const [lastGames, setLastGames] = useRecoilState(lastNGames);
  const stats = useRecoilValue(selectStatsTable);

  if (!stats) {
    return null;
  }

  return (
    <div className={classes.root}>
      <TextField
        style={{ width: 200, marginLeft: 66 }}
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
            legendPosition: 'middle',
          }}
          axisLeft={{
            orient: 'left',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'points',
            legendOffset: -40,
            legendPosition: 'middle',
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
          useMesh
          sliceTooltip={({ slice }) => (
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
          )}
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
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
        />
      </div>
    </div>
  );
};

export default RoomStats;
