import { HttpError } from "../errors/httperror";
import { formatError } from "../helpers";
export function queryParamValidator(){
    const before = async (request: any) => {
    try {
      const { queryStringParameters } = request.event;
      const cvc = queryStringParameters["cvc"];
      if(cvc.length > 3){
        throw new HttpError("cvc length should not be greater than 3", 400)
      }
    } catch (e: any) {
      return formatError(new HttpError(e.message, e.statusCode));
    }
  }

  return {
    before,
  }
}

