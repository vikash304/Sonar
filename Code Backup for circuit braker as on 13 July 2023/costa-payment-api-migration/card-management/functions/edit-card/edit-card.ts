import middy from "@middy/core";
import { LambdaResponse } from "../../libs/types";
import jsonBodyParser from "@middy/http-json-body-parser";
import httpErrorHandler from "@middy/http-error-handler";
import { formatResponse } from "../../libs/helpers";

const editCardHandler = async (event: any, context: any): Promise<LambdaResponse | undefined> => {
    console.log('route called');
    return formatResponse(JSON.stringify({ data: 'edit card handler' }));
}

export const handler = middy(editCardHandler)
    .use(jsonBodyParser()) // parses the request body when it's a JSON and converts it to an object
    .use(httpErrorHandler())