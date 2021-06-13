export const getUser = `
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

export const getRoom = /* GraphQL */ `
  query GetRoom($id: ID!) {
    getRoom(id: $id) {
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
          owner
          user {
            id
            username
            email
            firstName
            lastName
          }
        }
      }
      playoffCoefficient
      scorePoints
      differencePoints
      resultPoints
      promotionPoints
    }
  }
`;
