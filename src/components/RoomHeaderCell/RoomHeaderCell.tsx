import React from 'react';
import { createUseStyles } from 'react-jss';
import { TableCell, Tooltip } from '@material-ui/core';
import { FlagOutlined } from '@material-ui/icons';
import cx from 'classnames';

import { Game } from '../../types';

import styles from './RoomHeaderCell.styles';

const useStyles = createUseStyles(styles);

interface RoomHeaderProps extends Game {
  className: string
}

const RoomHeaderCell = React.forwardRef((
  { homeTeam, awayTeam, utcDate, status, score, className, matchday }: RoomHeaderProps,
  ref,
) => {
  const classes = useStyles();
  return (
    <TableCell
      align="center"
      className={className}
      ref={ref}
    >
      <Tooltip
        title={(
          <div>
            <div>{`${homeTeam.name || '?'} — ${awayTeam.name || '?'}`}</div>
            <div>{(new Date(utcDate)).toLocaleString()}</div>
          </div>
        )}
      >
        <div className={classes.content}>
          {homeTeam.icon
            ? (
              <img
                alt="flag"
                className={cx(classes.icon, score.winner === 'AWAY_TEAM' && matchday > 3 && classes.loser)}
                src={homeTeam.icon}
                title={homeTeam.name}
              />
            )
            : <FlagOutlined className={classes.flagDefault} />}
          <div className={classes.score}>
            {status === 'IN_PLAY' && <div className={classes.live}>●</div>}
            {typeof score.fullTime.homeTeam === 'number'
              ? score.fullTime.homeTeam
              : '-'}
            {' : '}
            {typeof score.fullTime.awayTeam === 'number'
              ? score.fullTime.awayTeam
              : '-'}
          </div>
          {awayTeam.icon
            ? (
              <img
                alt="flag"
                className={cx(classes.icon, score.winner === 'HOME_TEAM' && matchday > 3 && classes.loser)}
                src={awayTeam.icon}
                title={awayTeam.name}
              />
            )
            : <FlagOutlined className={classes.flagDefault} />}
        </div>
      </Tooltip>
    </TableCell>
  );
});

export default RoomHeaderCell;
