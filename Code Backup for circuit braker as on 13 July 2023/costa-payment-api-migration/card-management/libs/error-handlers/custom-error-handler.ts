import { HttpError } from "../errors/httperror";
import { formatError, formatResponse } from "../helpers";

export function errorHandlingMiddleware(){
  return {
    onError: async (request: any) => {
      const { error } = request;
      console.log('Error details:', error);
      if(error.cause && error.cause.length > 0){
        request.response = formatError(new HttpError(error.cause[0].message, error.statusCode));
      }
      else{
        request.response = formatError(error)
      }
    },
  };
};