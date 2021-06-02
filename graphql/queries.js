/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      firstName
      lastName
      email
      room {
        items {
          id
          name
          userId
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        firstName
        lastName
        email
        room {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getRoom = /* GraphQL */ `
  query GetRoom($id: ID!) {
    getRoom(id: $id) {
      id
      name
      userId
      user {
        id
        firstName
        lastName
        email
        room {
          nextToken
        }
        createdAt
        updatedAt
      }
      bets {
        items {
          id
          roomId
          userId
          game
          homeScore
          awayScore
          homeWins
          awayWins
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listRooms = /* GraphQL */ `
  query ListRooms(
    $filter: ModelRoomFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRooms(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        userId
        user {
          id
          firstName
          lastName
          email
          createdAt
          updatedAt
        }
        bets {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getBet = /* GraphQL */ `
  query GetBet($id: ID!) {
    getBet(id: $id) {
      id
      roomId
      userId
      game
      room {
        id
        name
        userId
        user {
          id
          firstName
          lastName
          email
          createdAt
          updatedAt
        }
        bets {
          nextToken
        }
        createdAt
        updatedAt
      }
      user {
        id
        firstName
        lastName
        email
        room {
          nextToken
        }
        createdAt
        updatedAt
      }
      homeScore
      awayScore
      homeWins
      awayWins
      createdAt
      updatedAt
    }
  }
`;
export const listBets = /* GraphQL */ `
  query ListBets(
    $filter: ModelBetFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBets(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        roomId
        userId
        game
        room {
          id
          name
          userId
          createdAt
          updatedAt
        }
        user {
          id
          firstName
          lastName
          email
          createdAt
          updatedAt
        }
        homeScore
        awayScore
        homeWins
        awayWins
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
