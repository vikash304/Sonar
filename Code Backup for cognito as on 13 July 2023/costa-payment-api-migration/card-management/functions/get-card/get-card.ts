import middy from "@middy/core";
import { LambdaResponse } from "../../libs/types";
import jsonBodyParser from "@middy/http-json-body-parser";
import httpErrorHandler from "@middy/http-error-handler";
import validator from '@middy/validator';
import { formatResponse } from "../../libs/helpers";

const getCardHandler = async (event: any, context: any): Promise<LambdaResponse | undefined> => {
    console.log(event.body);
    console.log('-------------------------------------------------------------');
    console.log(context);
    return formatResponse(JSON.stringify({ success: true, data: event.body }));
}

const inputSchema = {
    type: 'object',
    properties: {
      body: {
        type: 'object',
            properties:{
                name: {type: 'string', minLength : 10, maxLength: 19},
                email: {type: 'string', minLength:5, maxLength: 19}
            }
        // properties: {
        //   creditCardNumber: { type: 'string', minLength: 12, maxLength: 19, pattern: '\d+' },
        //   expiryMonth: { type: 'integer', minimum: 1, maximum: 12 },
        //   expiryYear: { type: 'integer', minimum: 2017, maximum: 2027 },
        //   cvc: { type: 'string', minLength: 3, maxLength: 4, pattern: '\d+' },
        //   nameOnCard: { type: 'string' },
        //   amount: { type: 'number' }
        // },
        // required: ['creditCardNumber'] // Insert here all required event properties
      }
    }
  }

export const handler = middy(getCardHandler)
    .use(jsonBodyParser()) // parses the request body when it's a JSON and converts it to an object
    // .use(validator({inputSchema}))
    .use(httpErrorHandler())