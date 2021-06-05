import { API, graphqlOperation } from 'aws-amplify';
import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';

export async function getUser(username) {
  const response = await API.graphql(graphqlOperation(queries.getUser, {
    id: username
  }));

  return response.data.getUser;
}

export async function getRoom(id) {
  const response = await API.graphql(graphqlOperation(queries.getRoom, {
    id
  }));

  return response.data.getRoom;
}


export async function joinRoom(roomId) {
  const player = await API.graphql(graphqlOperation(mutations.createPlayer, {
    input: {
      roomId,
    }
  }));

  return await getUser(player.data.createPlayer.owner);
}

export async function createUser(authData) {
  const response = await API.graphql(graphqlOperation(mutations.createUser, {
    input: {
      id: authData.username,
      username: authData.username,
      firstName: authData.attributes.given_name,
      lastName: authData.attributes.family_name,
      email: authData.attributes.email
    }
  }));

  return response.data.createUser;
}


export async function createBet(input) {
  const response = await API.graphql(graphqlOperation(mutations.createBet, {
    input
  }));

  return response.data.createBet;
}


export async function createRoom(roomData) {
  const room = await API.graphql(graphqlOperation(mutations.createRoom, {input: roomData}));
  return await joinRoom(room.data.createRoom.id);
}

export async function getGames() {
  return await API.get('eurobetsrest', '/games');
}
