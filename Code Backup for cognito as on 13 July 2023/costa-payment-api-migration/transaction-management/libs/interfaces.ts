/**
 * Interface for HTTP specific errors to be used with Lambda handlers.
 */
export interface HttpErrorInterface extends Error {
  message: string;
  statusCode: number;
}
