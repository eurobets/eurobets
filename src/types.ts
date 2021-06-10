export interface BetRequest {
  homeWins: boolean;
  homeScore: number;
  awayScore: number;
  awayWins: boolean;
  roomId: string;
  game: number;
}

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
  owner: string;
  id: string;
  user: User;
  room: Room;
}

export interface RoomRequest {
  name: string;
  scorePoints: number;
  differencePoints: number;
  resultPoints: number;
  promotionPoints: number;
  playoffCoefficient: number;
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
  started?: boolean;
  bet?: Bet;
  bot?: boolean
}

export interface RoomTableRow {
  id: string;
  name: string;
  games: TableGame[];
  score: number;
  bot?: boolean;
  avatar?: string;
}

export interface AuthorizationData {
  username: string;
  attributes: {
    given_name: string;
    family_name: string;
    email: string;
  }
}
