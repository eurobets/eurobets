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
              disabled
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
          disabled
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
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
              disabled
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
          disabled
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
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
              disabled
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
          disabled
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
export const onCreatePlayer = /* GraphQL */ `
  subscription OnCreatePlayer {
    onCreatePlayer {
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
          disabled
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
            disabled
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
export const onUpdatePlayer = /* GraphQL */ `
  subscription OnUpdatePlayer {
    onUpdatePlayer {
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
          disabled
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
            disabled
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
export const onDeletePlayer = /* GraphQL */ `
  subscription OnDeletePlayer {
    onDeletePlayer {
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
          disabled
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
            disabled
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
export const onCreateRoom = /* GraphQL */ `
  subscription OnCreateRoom {
    onCreateRoom {
      id
      name
      owner
      bets {
        id
        roomId
        game
        disabled
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
              disabled
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
export const onUpdateRoom = /* GraphQL */ `
  subscription OnUpdateRoom {
    onUpdateRoom {
      id
      name
      owner
      bets {
        id
        roomId
        game
        disabled
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
              disabled
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
export const onDeleteRoom = /* GraphQL */ `
  subscription OnDeleteRoom {
    onDeleteRoom {
      id
      name
      owner
      bets {
        id
        roomId
        game
        disabled
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
              disabled
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
export const onCreateBet = /* GraphQL */ `
  subscription OnCreateBet {
    onCreateBet {
      id
      roomId
      game
      disabled
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
export const onUpdateBet = /* GraphQL */ `
  subscription OnUpdateBet {
    onUpdateBet {
      id
      roomId
      game
      disabled
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
export const onDeleteBet = /* GraphQL */ `
  subscription OnDeleteBet {
    onDeleteBet {
      id
      roomId
      game
      disabled
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
