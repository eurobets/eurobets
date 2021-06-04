/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
      id
      username
      email
      firstName
      lastName
      rooms {
        items {
          id
          name
          userId
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
      id
      username
      email
      firstName
      lastName
      rooms {
        items {
          id
          name
          userId
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
      id
      username
      email
      firstName
      lastName
      rooms {
        items {
          id
          name
          userId
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
export const onCreateRoom = /* GraphQL */ `
  subscription OnCreateRoom {
    onCreateRoom {
      id
      name
      userId
      owner {
        id
        username
        email
        firstName
        lastName
        rooms {
          nextToken
        }
        bets {
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
export const onUpdateRoom = /* GraphQL */ `
  subscription OnUpdateRoom {
    onUpdateRoom {
      id
      name
      userId
      owner {
        id
        username
        email
        firstName
        lastName
        rooms {
          nextToken
        }
        bets {
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
export const onDeleteRoom = /* GraphQL */ `
  subscription OnDeleteRoom {
    onDeleteRoom {
      id
      name
      userId
      owner {
        id
        username
        email
        firstName
        lastName
        rooms {
          nextToken
        }
        bets {
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
        owner {
          id
          username
          email
          firstName
          lastName
          createdAt
          updatedAt
        }
        bets {
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
        rooms {
          nextToken
        }
        bets {
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
        owner {
          id
          username
          email
          firstName
          lastName
          createdAt
          updatedAt
        }
        bets {
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
        rooms {
          nextToken
        }
        bets {
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
        owner {
          id
          username
          email
          firstName
          lastName
          createdAt
          updatedAt
        }
        bets {
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
        rooms {
          nextToken
        }
        bets {
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
