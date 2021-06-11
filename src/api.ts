import { API, graphqlOperation } from 'aws-amplify';

import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';
import {
  User, Room, Player, AuthorizationData, Bet, Game,
} from './types';

type CreateBetInput = {
  homeWins: boolean,
  homeScore: number,
  awayScore: number,
  awayWins: boolean,
  roomId: string,
  game: number
};

type CreateRoomInput = {
  name: string,
  scorePoints: number,
  differencePoints: number,
  resultPoints: number,
  promotionPoints: number,
  playoffCoefficient: number
};

export async function getUser(id: string): Promise<User> {
  const response = await API.graphql(graphqlOperation(queries.getUser, {
    id,
  })) as { data: { getUser: User } };

  return response.data.getUser;
}

export async function getRoom(id: string): Promise<Room> {
  const response = await API.graphql(graphqlOperation(queries.getRoom, {
    id,
  })) as { data: { getRoom: Room } };

  return response.data.getRoom;
}

export async function joinRoom(roomId: string): Promise<User> {
  const player = await API.graphql(graphqlOperation(mutations.createPlayer, {
    input: {
      roomId,
    },
  })) as { data: { createPlayer: Player } };

  return getUser(player.data.createPlayer.owner);
}

export async function createUser(authData: AuthorizationData): Promise<User> {
  const response = await API.graphql(graphqlOperation(mutations.createUser, {
    input: {
      id: authData.username,
      username: authData.username,
      firstName: authData.attributes.given_name,
      lastName: authData.attributes.family_name,
      email: authData.attributes.email,
    },
  })) as { data: { createUser: User } };

  return response.data.createUser;
}

export async function createBet(input: CreateBetInput): Promise<Bet> {
  const response = await API.graphql(graphqlOperation(mutations.createBet, {
    input,
  })) as { data: { createBet: Bet } };

  return response.data.createBet;
}

export async function createRoom(input: CreateRoomInput): Promise<User> {
  const room = await API.graphql(graphqlOperation(mutations.createRoom, {
    input,
  })) as { data: { createRoom: Room } };
  return joinRoom(room.data.createRoom.id);
}

export async function getGames(): Promise<Game[]> {
  return API.get('eurobetsrest', '/games', null);
}
