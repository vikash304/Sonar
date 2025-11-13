import { HttpErrorInterface } from './interfaces';
import { LambdaResponse } from './types';

/**
 * Convert an object to string, add multiline and indentation.
 * @param {object} object Object to be prettified.
 * @returns Prettified string representation of the object.
 */
function serialize(object: any): string {
  return JSON.stringify(object, null, 2);
}

/**
 * Automatically format a response with return code 200 and the provided
 * response body.
 * @param {string} body Response body as string.
 * @returns Fully formatted response.
 */
function formatResponse(body: string): LambdaResponse {
  const response = {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    isBase64Encoded: false,
    body,
  };
  return response;
}

/**
 * Automatically format a JavaScript exception into a response. Return code and
 * the message returned will be extracted from the exception.
 * @param {HttpErrorInterface} error Exception to be formatted.
 * @returns Fully formatted response.
 */
function formatError(error: HttpErrorInterface): LambdaResponse {
  const response = {
    statusCode: error.statusCode,
    headers: {
      'Content-Type': 'text/plain',
      //'x-amzn-ErrorType': error.statusCode.toString(),
    },
    isBase64Encoded: false,
    body: serialize({
      statusCode: error.statusCode,
      message: error.message,
    }),
  };
  return response;
}

function findLastSegmentOfUrl(url: string): any {
 
    return url.toString().split("/").pop() || url.split("/").pop()
}

export { serialize, formatResponse, formatError, findLastSegmentOfUrl };

