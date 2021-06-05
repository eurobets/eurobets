import React, { useEffect, useState } from 'react';
import router, { useRouter } from 'next/router';
import Link from 'next/link';

import { createUseStyles } from 'react-jss';
import { Button, Typography } from '@material-ui/core';
import { useRecoilState } from 'recoil';
import { userState } from '../recoil/states';
import { joinRoom, getRoom } from '../api';
import Spinner from './Spinner';

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
  const [user, setUser] = useRecoilState(userState);
  const [room, setRoom] = useState({});
  const [alreadyThere, setAlreadyThere] = useState(false);
  const { query: { id } } = useRouter();

  useEffect(() => {
    getRoom(id).then(room => {
      if (room.players.items.find(player => player.user.id === user.id)) {
        setAlreadyThere(true);
      }
      setRoom(room);
    });
  }, [id]);

  if (!room.id) {
    return <Spinner />;
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
