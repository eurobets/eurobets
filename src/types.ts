export interface Bet {
  homeWins: boolean;
  homeScore: number | null;
  awayScore: number | null;
  awayWins: boolean;
  disabled: boolean;
  owner: string;
  roomId: string;
  game: number;
}

export interface Game {
  id: number;
  matchday: number;
  utcDate: string;
  score: {
    fullTime: {
      homeTeam: number;
      awayTeam: number;
    };
  };
  homeTeam: {
    name: string;
    icon: string;
  };
  awayTeam: {
    name: string;
    icon: string;
  };
}

export interface User {
  id: string;
  bets: {
    items: Bet[]
  };
  players: {
    items: Player[]
  };
  firstName: string;
  lastName?: string;
}

export interface Player {
  id: string;
  user: User;
  room: Room;
}

export interface Room {
  id: string;
  name: string;
  scorePoints: number;
  differencePoints: number;
  resultPoints: number;
  promotionPoints: number;
  playoffCoefficient: number;
  bets: Bet[];
  players: {
    items: Player[]
  };
}

export interface TableGame extends Game {
  points?: number | null;
  started: boolean;
  bet?: Bet;
  bot?: boolean
}

export interface TableRow {
  id: string;
  games: TableGame[];
  score: number;
  bot?: boolean;
  name: string;
}
