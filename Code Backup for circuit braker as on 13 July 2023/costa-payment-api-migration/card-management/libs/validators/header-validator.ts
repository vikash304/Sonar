import { HttpError } from "../errors/httperror";
import { formatError } from "../helpers";
export function headerValidator(validate: any){
    const before = async (request: any) => {
    try {
      console.log('validate func  ', validate); 
      const { headers} = request.event;
      console.log("headers data   " ,headers);
      validate(headers);
      console.log('header validation erros', validate.errors);
      // const {error} = validate(headers);
      // if(error){
      //   console.log(' error are here');
      //   console.log(error);
      //   throw error;
      // }
      // return next();
      
      /*This line will be removed only for testing purpose */
      // const expiryYear = headers["expiryyear"];
      // if(expiryYear < 2023){
      //   throw new HttpError("Year should not be less than current year", 400)
      // }
      // return Promise.resolve()
    } catch (e: any) {
      // console.log('  her validate.errors');
      // console.log(validate.errors[0]);
      return formatError(new HttpError(e.message, e.statusCode));
    //   return {
    //     statusCode: 400,
    //     body: JSON.stringify({
    //       errors: e.errors
    //     })
    //   }
    }
  }

  return {
    before,
  }
}

