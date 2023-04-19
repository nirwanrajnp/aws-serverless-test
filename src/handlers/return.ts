import { APIGatewayProxyResult } from 'aws-lambda';

export const returnResponse = (responseObject: any): APIGatewayProxyResult => {
  return {
    statusCode: responseObject.statusCode || 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
      'Content-Type': 'application/json'
    },
    body: responseObject.body,
  };
};
