import middy from "@middy/core";
import { LambdaResponse } from "../../libs/types";
import jsonBodyParser from "@middy/http-json-body-parser";
import httpErrorHandler from "@middy/http-error-handler";
import validator from '@middy/validator';
import { formatResponse } from "../../libs/helpers";

const addCardHandler = async (event: any, context: any): Promise<LambdaResponse | undefined> => {
    console.log(event.body);
    console.log('-------------------------------------------------------------');
    console.log(context);
    return formatResponse(JSON.stringify({ success: true, data: event.body }));
}


export const handler = middy(addCardHandler)
    .use(jsonBodyParser()) // parses the request body when it's a JSON and converts it to an object
    // .use(validator({inputSchema}))
    .use(httpErrorHandler())