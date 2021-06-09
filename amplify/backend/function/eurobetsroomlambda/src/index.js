/* Amplify Params - DO NOT EDIT
	API_EUROBETSREST_APIID
	API_EUROBETSREST_APINAME
	API_EUROBETS_GRAPHQLAPIENDPOINTOUTPUT
	API_EUROBETS_GRAPHQLAPIIDOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const axios = require('axios');
const AWS = require('aws-sdk');
const urlParse = require('url').URL;
const { listBets } = require('./queries');
const schedule = require('./schedule');

const appsyncUrl = process.env.API_EUROBETS_GRAPHQLAPIENDPOINTOUTPUT;
const region = process.env.REGION;
const endpoint = new urlParse(appsyncUrl).hostname.toString();
const MAX_INT = 2147483647;

const updateBet = (bet, gameStarted, mine) => {
  return {
  ...bet,
    disabled: !!gameStarted,
    ...(!gameStarted && !mine) && {
      homeScore: null,
      awayScore: null,
      homeWins: null,
      awayWins: null
    }
  }
};

exports.handler = async (event) => {
  const req = new AWS.HttpRequest(appsyncUrl, region);
  req.method = "POST";
  req.path = "/graphql";
  req.headers.host = endpoint;
  req.headers["Content-Type"] = "application/json";
  req.body = JSON.stringify({
    query: listBets,
    operationName: 'listBets',
  });
  const signer = new AWS.Signers.V4(req, 'appsync', true);
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
          },
          limit: MAX_INT
        }
      },
    {
        headers: event.request.headers
      }
    );

    return data.data.data.listBets.items
      .filter(item => new Date(item.createdAt) < new Date(schedule[item.game]))
      .map(item => {
        return (
          updateBet(
            item,
            new Date() > new Date(schedule[item.game]),
            item.owner === event.identity.username
          )
        )
      })
      .sort((a, b) => (new Date(b.updatedAt) - new Date(a.updatedAt)));
  } catch (error) {
    console.error('error', error.response.status);

    return [];
  }
};
