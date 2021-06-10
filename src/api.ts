import { API, graphqlOperation } from 'aws-amplify';

import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';
import { User, Room, Player, AuthorizationData, Bet, Game, BetRequest, RoomRequest } from './types';

export async function getUser(id: string): Promise<User> {
  const response = await API.graphql(graphqlOperation(queries.getUser, {
    id
  })) as { data: { getUser: User } };

  return response.data.getUser;
}

export async function getRoom(id: string): Promise<Room> {
  const response = await API.graphql(graphqlOperation(queries.getRoom, {
    id
  })) as { data: { getRoom: Room } };

  return response.data.getRoom;
}

export async function joinRoom(roomId: string): Promise<User> {
  const player = await API.graphql(graphqlOperation(mutations.createPlayer, {
    input: {
      roomId,
    }
  })) as { data: { createPlayer: Player } };

  return await getUser(player.data.createPlayer.owner);
}

export async function createUser(authData: AuthorizationData): Promise<User> {
  const response = await API.graphql(graphqlOperation(mutations.createUser, {
    input: {
      id: authData.username,
      username: authData.username,
      firstName: authData.attributes.given_name,
      lastName: authData.attributes.family_name,
      email: authData.attributes.email
    }
  })) as { data: { createUser: User } };

  return response.data.createUser;
}

export async function createBet(input: BetRequest): Promise<Bet> {
  const response = await API.graphql(graphqlOperation(mutations.createBet, {
    input
  })) as { data: { createBet: Bet } };

  return response.data.createBet;
}

export async function createRoom(roomData: RoomRequest): Promise<User> {
  const room = await API.graphql(graphqlOperation(mutations.createRoom, {
    input: roomData
  })) as { data: { createRoom: Room } };
  return await joinRoom(room.data.createRoom.id);
}

export async function getGames(): Promise<Game[]>{
  return await API.get('eurobetsrest', '/games', null);
}
