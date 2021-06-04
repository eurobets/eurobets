import { API, graphqlOperation } from 'aws-amplify';
import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';

export async function getUser(id) {
  const response = await API.graphql(graphqlOperation(queries.getUser, {
    id
  }));

  return response.data.getUser;
}

export async function getRooms(id) {
  const response = await API.graphql(graphqlOperation(queries.listRooms, {
    id
  }));

  return response.data.getUser;
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

export async function getGames() {
  return await API.get('eurobetsrest', '/games');
}
