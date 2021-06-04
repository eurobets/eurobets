import React from 'react';

interface Props {
  bet?: {
    homeWins: boolean;
    homeScore: number;
    awayScore: number;
    awayWins: boolean;
  };
}

const BetCellContent = ({ bet }: Props) => {
  return (
    <span>{bet
      ? `${bet.homeWins ? '🚀 ' : ' '}${bet.homeScore} : ${bet.awayScore}${bet.awayWins ? ' 🚀' : ' '}`
      : `- : -`}</span>
  );
};

export default BetCellContent;
