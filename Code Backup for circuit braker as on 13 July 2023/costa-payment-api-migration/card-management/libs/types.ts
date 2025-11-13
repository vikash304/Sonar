/**
 * Object structure denoting acceptable return values from Lambda handlers.
 */
export type LambdaResponse = {
  statusCode: number;
  headers: { [header: string]: string };
  isBase64Encoded: boolean;
  body: string;
};
