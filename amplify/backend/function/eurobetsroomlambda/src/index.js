/* Amplify Params - DO NOT EDIT
	API_EUROBETSREST_APIID
	API_EUROBETSREST_APINAME
	API_EUROBETS_GRAPHQLAPIENDPOINTOUTPUT
	API_EUROBETS_GRAPHQLAPIIDOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const axios = require('axios');
const AWS = require("aws-sdk");
const urlParse = require("url").URL;
const appsyncUrl = process.env.API_EUROBETS_GRAPHQLAPIENDPOINTOUTPUT;
const region = process.env.REGION;
const endpoint = new urlParse(appsyncUrl).hostname.toString();
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
      nextToken
    }
  }
`;

exports.handler = async (event) => {
    const req = new AWS.HttpRequest(appsyncUrl, region);
    req.method = "POST";
    req.path = "/graphql";
    req.headers.host = endpoint;
    req.headers["Content-Type"] = "application/json";
    req.body = JSON.stringify({
        query: listBets,
        operationName: 'listBets',
        variables: {}
    });
    const signer = new AWS.Signers.V4(req, "appsync", true);
    signer.addAuthorization(AWS.config.credentials, AWS.util.date.getDate());

    try {
        const data = await axios.post(
            process.env.API_EUROBETS_GRAPHQLAPIENDPOINTOUTPUT,
            {
                query: listBets,
                variables: {
                    filter: {
                        roomId: {
                            eq: event.source.id
                        }
                    }
                }
            },
          {
              headers: event.request.headers
          }
        );

        return data.data.data.listBets.items.map(item => {
            return item.owner === event.identity.username
              ? item
              : {
                  ...item,
                  homeScore: null,
                  awayScore: null,
                  homeWins: null,
                  awayWins: null
              }
        });
    } catch (error) {
        console.error('error', error.response.status);

        return [];
    }
};
