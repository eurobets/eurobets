import React, { FC, MouseEvent } from 'react';
import { Button, IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import BetText from '../BetText';
import { Bet } from '../../types';
import Points from '../Points';

interface BetCellContentProps {
  bet?: Bet,
  onClick?: (e: MouseEvent<HTMLElement>) => void;
  started?: boolean;
  onlyPoints?: boolean;
  points?: number | null;
}

const BetCellContent: FC<BetCellContentProps> = ({
  bet,
  onClick,
  started = false,
  points,
  onlyPoints = false,
}) => {

  if (onlyPoints) {
    return <Points>{points}</Points>;
  }
  return bet
    ? (onClick && !started && !bet.disabled
      ? <Button onClick={onClick} size="small" color="primary"><BetText {...bet} /></Button>
      : <div>
        <div><BetText {...bet} /></div>
        <Points>{points}</Points>
      </div>)
    : (onClick && !started
      ? <IconButton onClick={onClick} size="small" color="primary"><AddIcon /></IconButton>
      : null);
};

export default BetCellContent;
