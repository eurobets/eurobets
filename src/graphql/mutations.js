export const createUser = `
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
            }
          }
        }
      }
    }
  }
`;
export const createPlayer = `
  mutation CreatePlayer(
    $input: CreatePlayerInput!
    $condition: ModelPlayerConditionInput
  ) {
    createPlayer(input: $input, condition: $condition) {
      owner
    }
  }
`;
export const createRoom = `
  mutation CreateRoom(
    $input: CreateRoomInput!
    $condition: ModelRoomConditionInput
  ) {
    createRoom(input: $input, condition: $condition) {
      id
    }
  }
`;
export const createBet = `
  mutation CreateBet(
    $input: CreateBetInput!
    $condition: ModelBetConditionInput
  ) {
    createBet(input: $input, condition: $condition) {
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
