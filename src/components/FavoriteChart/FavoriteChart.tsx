import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import { ResponsiveBar } from '@nivo/bar';
import { FormControl, Select, InputLabel, MenuItem } from '@material-ui/core';

import { useRecoilValue } from 'recoil';
import { userState } from '../../store/atoms';
import { selectRoomTable, selectFavoriteTeams } from '../../store/selectors';

import styles from './FavoriteChart.styles';

const useStyles = createUseStyles(styles);

const RoomStats = () => {
  const classes = useStyles();
  const user = useRecoilValue(userState);
  const roomTable = useRecoilValue(selectRoomTable);
  const [player, setPlayer] = useState(roomTable?.find((item) => item.id === user?.id)?.id || '');
  const stats = useRecoilValue(selectFavoriteTeams);

  if (!stats || !roomTable) {
    return null;
  }

  // @ts-ignore
  return (
    <div className={classes.root}>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Player</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={player}
          onChange={({ target: { value } }) => setPlayer(value as string)}
          label="Player"
        >
          {roomTable.map(({ id, name }) => (
            <MenuItem key={id} value={id}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <div className={classes.content}>
        {/* @ts-ignore */}
        {stats[player] && (
          <ResponsiveBar
            data={
              // @ts-ignore
              stats[player]
            }
            keys={['points']}
            indexBy="country"
            margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
            padding={0.3}
            valueScale={{ type: 'linear' }}
            indexScale={{ type: 'band', round: true }}
            colors={{ scheme: 'nivo' }}
            borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              legendOffset: 64,
              tickRotation: -25,
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'points',
              legendPosition: 'middle',
              legendOffset: -40,
            }}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
          />
        )}
      </div>
    </div>
  );
};

export default RoomStats;
