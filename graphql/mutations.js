/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
export const createPlayer = /* GraphQL */ `
  mutation CreatePlayer(
    $input: CreatePlayerInput!
    $condition: ModelPlayerConditionInput
  ) {
    createPlayer(input: $input, condition: $condition) {
      id
      roomId
      owner
      room {
        id
        name
        owner
        bets {
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
      user {
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
      createdAt
      updatedAt
    }
  }
`;
export const updatePlayer = /* GraphQL */ `
  mutation UpdatePlayer(
    $input: UpdatePlayerInput!
    $condition: ModelPlayerConditionInput
  ) {
    updatePlayer(input: $input, condition: $condition) {
      id
      roomId
      owner
      room {
        id
        name
        owner
        bets {
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
      user {
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
      createdAt
      updatedAt
    }
  }
`;
export const deletePlayer = /* GraphQL */ `
  mutation DeletePlayer(
    $input: DeletePlayerInput!
    $condition: ModelPlayerConditionInput
  ) {
    deletePlayer(input: $input, condition: $condition) {
      id
      roomId
      owner
      room {
        id
        name
        owner
        bets {
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
      user {
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
      createdAt
      updatedAt
    }
  }
`;
export const createRoom = /* GraphQL */ `
  mutation CreateRoom(
    $input: CreateRoomInput!
    $condition: ModelRoomConditionInput
  ) {
    createRoom(input: $input, condition: $condition) {
      id
      name
      owner
      bets {
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
export const updateRoom = /* GraphQL */ `
  mutation UpdateRoom(
    $input: UpdateRoomInput!
    $condition: ModelRoomConditionInput
  ) {
    updateRoom(input: $input, condition: $condition) {
      id
      name
      owner
      bets {
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
export const deleteRoom = /* GraphQL */ `
  mutation DeleteRoom(
    $input: DeleteRoomInput!
    $condition: ModelRoomConditionInput
  ) {
    deleteRoom(input: $input, condition: $condition) {
      id
      name
      owner
      bets {
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
export const createBet = /* GraphQL */ `
  mutation CreateBet(
    $input: CreateBetInput!
    $condition: ModelBetConditionInput
  ) {
    createBet(input: $input, condition: $condition) {
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
export const updateBet = /* GraphQL */ `
  mutation UpdateBet(
    $input: UpdateBetInput!
    $condition: ModelBetConditionInput
  ) {
    updateBet(input: $input, condition: $condition) {
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
export const deleteBet = /* GraphQL */ `
  mutation DeleteBet(
    $input: DeleteBetInput!
    $condition: ModelBetConditionInput
  ) {
    deleteBet(input: $input, condition: $condition) {
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
