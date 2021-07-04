import React, { FC, MouseEvent } from 'react';
import { Button, IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import BetText from '../BetText';
import { BaseBet } from '../../types';
import Points from '../Points';

interface BetCellContentProps {
  bet?: BaseBet,
  onClick?: (e: MouseEvent<HTMLElement>) => void;
  started?: boolean;
  bot?: boolean;
  points?: number | null;
}

const BetCellContent: FC<BetCellContentProps> = ({
  bet,
  onClick,
  started = false,
  points,
  bot = false,
}) => {
  if (bot && !bet) {
    return <Points>{points}</Points>;
  }

  if (!bet) {
    return onClick && !started
      ? (
        <IconButton onClick={onClick} size="small" data-testid="add-bet" color="primary">
          <AddIcon />
        </IconButton>
      )
      : null;
  }
  return onClick && !started && !bet.disabled
    ? (
      <Button onClick={onClick} size="small" data-testid="edit-bet" color="primary">
        <BetText {...bet} />
      </Button>
    )
    : (
      <div data-testid="non-interactive-bet">
        <div><BetText {...bet} /></div>
        <Points>{points}</Points>
      </div>
    );
};

export default BetCellContent;
