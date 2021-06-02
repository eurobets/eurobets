/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
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
export const onCreateRoom = /* GraphQL */ `
  subscription OnCreateRoom {
    onCreateRoom {
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
export const onUpdateRoom = /* GraphQL */ `
  subscription OnUpdateRoom {
    onUpdateRoom {
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
export const onDeleteRoom = /* GraphQL */ `
  subscription OnDeleteRoom {
    onDeleteRoom {
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
export const onCreateBet = /* GraphQL */ `
  subscription OnCreateBet {
    onCreateBet {
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
export const onUpdateBet = /* GraphQL */ `
  subscription OnUpdateBet {
    onUpdateBet {
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
export const onDeleteBet = /* GraphQL */ `
  subscription OnDeleteBet {
    onDeleteBet {
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
