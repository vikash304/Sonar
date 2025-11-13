import { formatResponse, formatError } from '../../libs/helpers';
import { runChecks } from '../../libs/healthcheck/index';
import { HttpError } from '../../libs/errors/httperror';
import { LambdaResponse } from '../../libs/types';
import { getLogger } from '../../libs/logging';
import { PaymentService } from '../../services/payment-service'
import middy from '@middy/core';
import jsonBodyParser from '@middy/http-json-body-parser';
import httpErrorHandler from '@middy/http-error-handler';
import WinstonCloudWatch from 'winston-cloudwatch'
import { CloudWatchLogs } from 'aws-sdk';
import AWS from 'aws-sdk'
import validator from '@middy/validator'
import { transpileSchema } from '@middy/validator/transpile'
import httpJsonBodyParser from '@middy/http-json-body-parser'

import dotenv from 'dotenv';
import { SendMessage } from '../../sqs/send-message';
import { KMS } from '../../libs/kms'
import { LogEntry } from 'winston';
import { headerValidator } from '../../libs/validators/header-validator';
import { queryParamValidator } from '../../libs/validators/query-param-validator';
import { errorHandlingMiddleware } from '../../libs/error-handlers/custom-error-handler';

dotenv.config();

const logger = getLogger(__filename);


const inputSchema = {
  type: 'object',
  properties: {
    body: {
      type: 'object',
      properties: {
        creditCardNumber: { type: 'string', minLength: 12, maxLength: 19, pattern: '\\d+' },
        expiryMonth: { type: 'integer', minimum: 1, maximum: 12 },
        expiryYear: { type: 'integer', minimum: 2017, maximum: 2027 },
        cvc: { type: 'string', minLength: 3, maxLength: 4, pattern: '\\d+' },
        nameOnCard: { type: 'string' },
        amount: { type: 'number' }
      },
      required: ['creditCardNumber'] // Insert here all required event properties
    },
    headers: {
      type: 'object',
      properties: {
        expirymonth: { type: 'integer', minimum: 1, maximum: 12 },
        expiryyear: { type: 'integer', minimum: 2017, maximum: 2027 },
      }
    },
    query:{
      type:'object',
      properties: {
        cvc: {
          type: 'string', minLength: 3, maxLength: 4, pattern: '\\d+'
        },
      },
    }
  }
 }

/**
 * Handler function for API health check. Retrieve health status and return a
 * response based on the status.
 * @returns Response with current health status.
 */
const coreHandler = async (event: any, context: any): Promise<LambdaResponse | undefined> => {
  console.log('event data');
  
  let result;
  switch (context) {
    case 'healthcheck':
      break;
    default:
      
      /******Cognito Code*******/


      /*********Database Integration********** */
       // logger.log('info', `Requesting data`, {tags: 'http', additionalInfo: {body: 'b1', headers: 'req.headers' }});
        // logger.log('info', '28 june');
        // // logger.info('Hello, today!', { someData: 42 });
        // console.log(`"${process.env.CLOUDWATCH_GROUP_NAME}"`);
        let paymentService =  new PaymentService();
        result = paymentService.getPaymentData();
        // return formatResponse(JSON.stringify(result));
        return formatResponse(JSON.stringify({
          message: 'OK',
        }));
      break;
  }
};


export const handler = middy(coreHandler)
  .use(jsonBodyParser())
  .use(headerValidator(transpileSchema(inputSchema)))
  .use(queryParamValidator())
  .use(validator({
    eventSchema: transpileSchema(inputSchema)
  }))
  .use(errorHandlingMiddleware()) 
