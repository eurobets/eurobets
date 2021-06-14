import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BetCellContent from './BetCellContent';

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

describe('Returns null', () => {
  test('In case no pops', async () => {
    const { container } = render(<BetCellContent />);
    expect(container.firstChild).toBeNull();
  });

  test('onlyPoints: if no points provided', async () => {
    const { container } = render(<BetCellContent onlyPoints />);

    expect(container.firstChild).toBeNull();
  });

  test('No bet and started', async () => {
    const mockOnClick = jest.fn();

    const { container } = render(<BetCellContent onClick={mockOnClick} started />);

    expect(container.firstChild).toBeNull();
  });
});

describe('Interactive', () => {
  test('onClick only: returns creation button, onClick executed on click', async () => {
    const mockOnClick = jest.fn();

    render(<BetCellContent onClick={mockOnClick} />);

    fireEvent.click(screen.getByTestId('add-bet'));
    expect(screen.getByTestId('add-bet')).toBeEnabled();
    expect(mockOnClick.mock.calls.length).toBe(1);
  });

  test('onClick with bet: returns edit button, onClick executed on click', async () => {
    const mockOnClick = jest.fn();

    const { container } = render(<BetCellContent onClick={mockOnClick} bet={defaultBet} />);

    fireEvent.click(screen.getByTestId('edit-bet'));
    expect(container.firstChild).toHaveTextContent('1 : 2');
    expect(screen.getByTestId('edit-bet')).toBeEnabled();
    expect(mockOnClick.mock.calls.length).toBe(1);
  });
});

describe('Displaying points', () => {
  test('onlyPoints', async () => {
    const { container } = render(<BetCellContent onlyPoints points={5} />);

    expect(container.firstChild).toHaveTextContent('5');
  });

  test('Points and bets', async () => {
    const { container } = render(<BetCellContent points={5} bet={defaultBet} />);

    expect(container.firstChild).toHaveTextContent('5');
    expect(container.firstChild).toHaveTextContent('1 : 2');
  });

  test('Bets when game started are not interactive', async () => {
    const mockOnClick = jest.fn();

    const { container } = render((
      <BetCellContent
        onClick={mockOnClick}
        bet={defaultBet}
        started
      />
    ));

    expect(screen.getByTestId('non-interactive-bet')).toBeVisible();
    expect(container.firstChild).toHaveTextContent('1 : 2');
  });

  test('Bets when game started are not interactive', async () => {
    const mockOnClick = jest.fn();

    const { container } = render((
      <BetCellContent
        onClick={mockOnClick}
        bet={{
          ...defaultBet,
          homeWins: true,
        }}
        started
      />
    ));

    expect(screen.getByTestId('non-interactive-bet')).toBeVisible();
    expect(screen.getByTestId('home-wins')).toBeVisible();
    expect(container.firstChild).toHaveTextContent('1 : 2');
  });
});
