import React, { useEffect, useState } from 'react';
import router, { useRouter } from 'next/router';
import Link from 'next/link';
import { createUseStyles } from 'react-jss';
import { Button, Typography } from '@material-ui/core';
import { SetterOrUpdater, useRecoilState } from 'recoil';

import { userState } from '../../store/atoms';
import { joinRoom, getRoom } from '../../api';
import Spinner from '../Spinner';
import { Player, Room } from '../../types';

const useStyles = createUseStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  button: {
    '&&': {
      margin: [16, 0],
    },
    width: 300
  }
});
const JoinRoom = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useRecoilState(userState);
  const [room, setRoom] = useState<Room | null>(null);
  const [alreadyThere, setAlreadyThere] = useState(false);
  const { query: { id } } = useRouter();

  useEffect(() => {
    setLoading(true);
    getRoom(id as string)
      .then(room => {
        if (room?.players.items.find((player: Player) => player.user.id === user?.id)) {
          setAlreadyThere(true);
        }
        setRoom(room);
      })
      .finally(() => setLoading(false));
  }, [id]);


  if (loading) {
    return <Spinner />;
  }

  if (!room) {
    return null;
  }

  return (
    <div className={classes.root}>
      <Typography variant="h3" component="h2">
        Join room "{room.name}"
      </Typography>
      <Typography variant="subtitle1" component="h2">
        {alreadyThere ? 'you\'re already in this room' : 'Would you like to join this room?'}

      </Typography>
      {alreadyThere
        ? (
          <Link href={`/rooms/${room.id}`}>
            <Button
              component="a"
              color="primary"
              variant="contained"
            >
              Go to {room.name}
            </Button>
          </Link>
        )
        : (
          <Button
            color="primary"
            variant="contained"
            onClick={() => {
              joinRoom(room.id)
                .then(setUser)
                .then(() => router.push(`/rooms/${room.id}`));
            }}
          >
            Join
          </Button>
        )
      }
    </div>
  );
};

export default JoinRoom;
