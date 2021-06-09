const listBets = /* GraphQL */ `
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
    }
  }
`;

module.exports.listBets = listBets;
