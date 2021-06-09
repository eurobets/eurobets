import React, { FC, MouseEvent } from 'react';
import { Button, IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import BetText from '../BetText';
import { Bet } from '../../types';

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
