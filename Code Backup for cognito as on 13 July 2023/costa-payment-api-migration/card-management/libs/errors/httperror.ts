import { HttpErrorInterface } from '../interfaces';

/**
 * Error class that has a statusCode property as well as some pre-defined error
 * messages. The messages are designed to be ready to return as error response
 * content.
 */
export class HttpError extends Error implements HttpErrorInterface {
  static ERR_REQUEST = 'Invalid request';

  static ERR_INVALID_POST_DATA = 'Invalid post data';

  static ERR_CONTENT_UNAVAILABLE = 'Content not available';

  static ERR_SERVER = 'Internal server error';

  static ERR_UPSTREAM = 'Upstream server error';

  static ERR_FORBIDDEN = 'Forbidden';

  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.name = 'HttpError';
    this.statusCode = statusCode;
  }
}
