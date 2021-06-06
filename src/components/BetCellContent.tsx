import React from 'react';
import { Button, IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import CheckIcon from '@material-ui/icons/Check';

type Bet = {
  homeWins: boolean;
  homeScore: number;
  awayScore: number;
  awayWins: boolean;
}
interface Props {
  bet?: Bet,
  onClick?: (e: any) => void;
}

const getBetText = (bet: Bet) => {
  if (typeof bet.homeScore !== 'number' || typeof bet.awayScore !== 'number') {
    return <CheckIcon />
  };
  return `${bet.homeWins ? '🚀 ' : ' '}${bet.homeScore} : ${bet.awayScore}${bet.awayWins ? ' 🚀' : ' '}`;
}

const BetCellContent = ({ bet, onClick }: Props) => {
  return bet
    ? (onClick ? <Button onClick={onClick} size="small" color="primary">{getBetText(bet)}</Button> : <span>{getBetText(bet)}</span>)
    : (onClick ? <IconButton onClick={onClick} size="small" color="primary"><AddIcon /></IconButton> : null);
};

export default BetCellContent;
