import React, { useState } from 'react';
import router from 'next/router';

import { createUseStyles } from 'react-jss';
import { TextField, Button, Typography } from '@material-ui/core';
import { useRecoilState } from 'recoil';
import { userState } from '../../store/atoms';
import { createRoom } from '../../api';

const useStyles = createUseStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  field: {
    '&&': {
      margin: [16, 0],
    },
    width: 300
  }
});
const CreateRoom = () => {
  const [, setUser] = useRecoilState(userState);
  const classes = useStyles();
  const [name, setName] = useState('');
  const [playoffCoefficient, setPlayoffCoefficient] = useState(1);
  const [scorePoints, setScorePoints] = useState(5);
  const [differencePoints, setDifferencePoints] = useState(3);
  const [resultPoints, setResultPoints] = useState(2);
  const [promotionPoints, setPromotionPoints] = useState(2);
  const commonTextFieldProps = {
    required: true,
    className: classes.field,
    InputLabelProps: { shrink: true }
  }

  return (
    <div className={classes.root}>
      <Typography variant="h3" component="h2">
        Create new room
      </Typography>
      <Typography variant="subtitle1" component="h2">
        Create a room to share it with your friends
      </Typography>
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
          onSubmit={(e) => {
          e.preventDefault();
            createRoom(
            {
              name,
              playoffCoefficient,
              scorePoints,
              differencePoints,
              resultPoints,
              promotionPoints
            }
          )
            .then(setUser)
            .then(() => router.push('/'));
          }}
      >
        <TextField
          {...commonTextFieldProps}
          onChange={e => setName(e.target.value)}
          label="Title"
          value={name}
        />
        <TextField
          {...commonTextFieldProps}
          type="number"
          label="Points for correct score"
          onChange={e => setScorePoints(Number(e.target.value))}
          value={scorePoints}
        />
        <TextField
          {...commonTextFieldProps}
          type="number"
          label="Points for correct difference"
          onChange={e => setDifferencePoints(Number(e.target.value))}
          value={differencePoints}
        />
        <TextField
          {...commonTextFieldProps}
          type="number"
          label="Points for correct result"
          onChange={e => setResultPoints(Number(e.target.value))}
          value={resultPoints}
        />
        <TextField
          {...commonTextFieldProps}
          type="number"
          label="Additional points for playoff winners"
          onChange={e => setPromotionPoints(Number(e.target.value))}
          value={promotionPoints}
        />
        <TextField
          {...commonTextFieldProps}
          type="number"
          label="Coefficient for playoff games"
          onChange={e => setPlayoffCoefficient(Number(e.target.value))}
          value={playoffCoefficient}
        />
        <Button type="submit" variant="contained" color="primary">Create</Button>
      </form>
    </div>
  );
};

export default CreateRoom;
