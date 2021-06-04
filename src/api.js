import { API, graphqlOperation } from 'aws-amplify';
import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';

export async function getUser(id) {
  const response = await API.graphql(graphqlOperation(queries.getUser, {
    id
  }));

  return response.data.getUser;
}

export async function getRoom(id) {
  const response = await API.graphql(graphqlOperation(queries.getRoom, {
    id
  }));

  return response.data.getRoom;
}


export async function joinRoom({ roomId, userId }) {
  await API.graphql(graphqlOperation(mutations.createPlayer, {
    input: {
      roomId,
      userId
    }
  }));

  return await getUser(userId);
}

export async function createUser(authData) {
  const response = await API.graphql(graphqlOperation(mutations.createUser, {
    input: {
      id: authData.attributes.sub,
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


export async function createRoom(roomData, userId) {
  const room = await API.graphql(graphqlOperation(mutations.createRoom, {input: roomData}));
  return await joinRoom({
    roomId: room.data.createRoom.id,
    userId
  });
}

export async function getGames() {
  return await API.get('eurobetsrest', '/games');
}
