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
import { CircuitBreaker } from '../../libs/circuit-breaker';

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

 let message;
 const options = {
   fallback: fallbackFunction,
   failureThreshold: 3,
   successThreshold: 2,
   timeout: 10000
 };
 function unreliableFunction () {
   return new Promise((resolve, reject) => {
     if (Math.random() < 0.6) {
       resolve({ data: 'Success' })
       message = 'Success'
     } else {
       reject({ data: 'Failed' })
       message = 'Failed'
     }
   })
 }
 function fallbackFunction () {
   return new Promise((resolve, reject) => {
     resolve({ data: 'Expensive Fallback Successful' })
     message = 'Fallback'
   })
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
      logger.info('Health check ok');
      const status = await runChecks();
      if (status) {
        return formatResponse(JSON.stringify({
          message: 'OK',
        }));
      }
      return formatError(new HttpError('Unhealthy', 500));
      break;
    default:
      /*********Sqs Integration ******/
      // let sendMessage = new SendMessage();
      // var params = {
      //         MessageGroupId : "MyFifoTestGroup",
      //         MessageAttributes: {
      //           "Title": {
      //             DataType: "String",
      //             StringValue: "The Fifo msg 01"
      //           }
      //         },
      //         MessageDeduplicationId:'2',
      //         MessageBody: "Test 123 Information about current NY Times fiction bestseller for week of 12/11/2016.",
      //         QueueUrl: process.env.AWS_TEST_QUEUE
      //       };
      // sendMessage.sendQueueMessage(params);   
/****************** KMS Integration***/
      // let kms = new KMS();
      // let encrypted = await kms.encryptMessage("Test message");
      // console.log("Encrypted data " + encrypted);
      // let decrypted = await kms.decryptMessage(encrypted);
      // console.log("decrypted data " + decrypted);
      // return formatResponse(JSON.stringify(decrypted));
      // console.log(event);
      console.log('Card Details as below:');
      console.log(event.headers);
      
      //const json = '{"foo": 1, "bar": "abc"}';
      const json ='{"expirymonth":12,"expiryyear":2018,"x-costa-error-version":"2039","content-type":"application/json","user-agent":"PostmanRuntime/7.32.3","accept":"*/*","cache-control":"no-cache","postman-token":"5a360b9a-c7a5-4f60-ba90-bc2cf283cdd0","host":"localhost:3000","accept-encoding":"gzip, deflate, br","connection":"keep-alive","content-length":"163"}'
      const data = JSON.parse(json);
      console.log(data);
      console.log(JSON.stringify(event.headers));
      console.log('After parse');
      console.log(JSON.parse(JSON.stringify(event.headers)));
      let circuitBreaker =  new CircuitBreaker(unreliableFunction, options);
      console.log('************');
      console.log('context data')
      // console.log(context);
      // const cloudconfig = {
      //   region: process.env.AWS_REGION, // replace with your region
      // }
      // const cloudwatchlogs = new AWS.CloudWatchLogs(cloudconfig)
      
      //    const params: any = {
      //     destination: 'test28june2023', // replace with your bucket name
      //     from: new Date().getTime() - 8640000,
      //     logGroupName: process.env.CLOUDWATCH_GROUP_NAME,
      //     to: new Date().getTime(),
      //     destinationPrefix: 'doc-example-bucket', // replace with random string used to give permisson on S3 bucket
      //   };
      // await cloudwatchlogs.createExportTask(params).promise().then((data) => {
      //     console.log(data)
      //     return ({
      //       statusCode: 200,
      //         body: data,
      //     });
      //   }).catch((err) => {
      //     console.error(err)
      //     return ({
      //       statusCode: 501,
      //         body: err,
      //     });
      //   });
      


        /*********Database Integration********** */
       // logger.log('info', `Requesting data`, {tags: 'http', additionalInfo: {body: 'b1', headers: 'req.headers' }});
        // logger.log('info', '28 june');
        // // logger.info('Hello, today!', { someData: 42 });
        // console.log(`"${process.env.CLOUDWATCH_GROUP_NAME}"`);
        // let paymentService =  new PaymentService();
        // result = paymentService.getPaymentData();
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
  .use(errorHandlingMiddleware()) // handles common http errors and returns proper responses


  // .use(validator({eventSchema :()=>JSON.stringify(inputSchema)}))