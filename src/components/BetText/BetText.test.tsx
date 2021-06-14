import React from 'react';
import { render, screen } from '@testing-library/react';
import BetText from './BetText';

const defaultBet = {
  homeScore: 1,
  awayScore: 2,
  homeWins: false,
  awayWins: false,
  disabled: false,
  owner: 'me',
  started: false,
  roomId: '123',
  game: 123,
};

describe('Returns bet placed mark', () => {
  test('home score is null', async () => {
    render(<BetText {...defaultBet} homeScore={null} />);
    expect(screen.getByTestId('bet-placed')).toBeVisible();
  });
  test('away score is null', async () => {
    render(<BetText {...defaultBet} awayScore={null} />);
    expect(screen.getByTestId('bet-placed')).toBeVisible();
  });
});

describe('Displaying score', () => {
  test('Only score', async () => {
    const { container } = render(<BetText {...defaultBet} />);

    expect(container.firstChild).toHaveTextContent('1 : 2');
  });
  test('Score + home wins', async () => {
    const { container } = render(<BetText {...defaultBet} homeWins />);

    expect(screen.getByTestId('home-wins')).toBeVisible();
    expect(container.firstChild).toHaveTextContent('1 : 2');
  });

  test('Score + away wins', async () => {
    const { container } = render(<BetText {...defaultBet} awayWins />);

    expect(screen.getByTestId('away-wins')).toBeVisible();
    expect(container.firstChild).toHaveTextContent('1 : 2');
  });
});
