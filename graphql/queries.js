/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      username
      email
      firstName
      lastName
      players {
        items {
          id
          roomId
          owner
          room {
            id
            name
            owner
            bets {
              nextToken
            }
            players {
              nextToken
            }
            playoffCoefficient
            scorePoints
            differencePoints
            resultPoints
            promotionPoints
            createdAt
            updatedAt
          }
          user {
            id
            username
            email
            firstName
            lastName
            players {
              nextToken
            }
            bets {
              nextToken
            }
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
        nextToken
      }
      bets {
        items {
          id
          roomId
          game
          homeScore
          awayScore
          homeWins
          awayWins
          owner
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
        username
        email
        firstName
        lastName
        players {
          items {
            id
            roomId
            owner
            room {
              id
              name
              owner
              playoffCoefficient
              scorePoints
              differencePoints
              resultPoints
              promotionPoints
              createdAt
              updatedAt
            }
            user {
              id
              username
              email
              firstName
              lastName
              createdAt
              updatedAt
            }
            createdAt
            updatedAt
          }
          nextToken
        }
        bets {
          items {
            id
            roomId
            game
            homeScore
            awayScore
            homeWins
            awayWins
            owner
            createdAt
            updatedAt
          }
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
      owner
      bets {
        items {
          id
          roomId
          game
          homeScore
          awayScore
          homeWins
          awayWins
          owner
          createdAt
          updatedAt
        }
        nextToken
      }
      players {
        items {
          id
          roomId
          owner
          room {
            id
            name
            owner
            bets {
              nextToken
            }
            players {
              nextToken
            }
            playoffCoefficient
            scorePoints
            differencePoints
            resultPoints
            promotionPoints
            createdAt
            updatedAt
          }
          user {
            id
            username
            email
            firstName
            lastName
            players {
              nextToken
            }
            bets {
              nextToken
            }
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
        nextToken
      }
      playoffCoefficient
      scorePoints
      differencePoints
      resultPoints
      promotionPoints
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
        owner
        bets {
          items {
            id
            roomId
            game
            homeScore
            awayScore
            homeWins
            awayWins
            owner
            createdAt
            updatedAt
          }
          nextToken
        }
        players {
          items {
            id
            roomId
            owner
            room {
              id
              name
              owner
              playoffCoefficient
              scorePoints
              differencePoints
              resultPoints
              promotionPoints
              createdAt
              updatedAt
            }
            user {
              id
              username
              email
              firstName
              lastName
              createdAt
              updatedAt
            }
            createdAt
            updatedAt
          }
          nextToken
        }
        playoffCoefficient
        scorePoints
        differencePoints
        resultPoints
        promotionPoints
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
      game
      homeScore
      awayScore
      homeWins
      awayWins
      owner
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
        game
        homeScore
        awayScore
        homeWins
        awayWins
        owner
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
