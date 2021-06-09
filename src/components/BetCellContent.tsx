import React from 'react';
import { Button, IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import BetText from './BetText';

type Bet = {
  homeWins: boolean;
  homeScore: number;
  awayScore: number;
  awayWins: boolean;
  disabled: boolean;
}
interface Props {
  bet?: Bet,
  onClick?: (e: any) => void;
  started?: boolean;
  onlyPoints?: boolean;
  points?: number;
}

const BetCellContent = ({ bet, onClick, started, points, onlyPoints }: Props) => {
  if (onlyPoints && points !== null) {
    return <div>{points}</div>;
  }
  return bet
    ? (onClick && !started && !bet.disabled
      ? <Button onClick={onClick} size="small" color="primary"><BetText {...bet} /></Button>
      : <div>
        <div><BetText {...bet} /></div>
        <div>{points}</div>
      </div>)
    : (onClick && !started
      ? <IconButton onClick={onClick} size="small" color="primary"><AddIcon /></IconButton>
      : null);
};

export default BetCellContent;
