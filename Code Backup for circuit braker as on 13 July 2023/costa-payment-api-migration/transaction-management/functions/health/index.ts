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
// import validator from '@middy/validator';

import dotenv from 'dotenv';
import { SendMessage } from '../../sqs/send-message';
import { KMS } from '../../libs/kms'
import { LogEntry } from 'winston';
dotenv.config();
const logger = getLogger(__filename);
// const inputSchema = {
//   type: "object",
//   properties: {
//     body: {
//       type: "object",
//       properties: {
//         fname: { type: "string" },
//         lname: { type: "string" },
//       },
//       required: ["fname", "lname"],
//     },

//   },
// };
/**
 * Handler function for API health check. Retrieve health status and return a
 * response based on the status.
 * @returns Response with current health status.
 */
const coreHandler = async (event: any, context: any): Promise<LambdaResponse | undefined> => {
  console.log('event data');

  console.log('context data')

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

      console.log('Card Details as below:');
      console.log('************');
      
      //   const cloudwatchConfig = {
      //       logGroupName: process.env.CLOUDWATCH_GROUP_NAME,
      //       logStreamName: `${process.env.CLOUDWATCH_GROUP_NAME}-${process.env.NODE_ENV}`,
      //       awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
      //       awsSecretKey: process.env.AWS_SECRET_ACCESS_KEY,
      //       awsRegion: process.env.AWS_REGION,
      //       messageFormatter: ( {level , message, additionalInfo}:LogEntry ):string =>    `[${level}] : ${message} \nAdditional Info: ${JSON.stringify(additionalInfo)}}`
      //   }
      //       logger.add(new WinstonCloudWatch(cloudwatchConfig))
       
      //       logger.log('info', `Requesting data`, {tags: 'http', additionalInfo: {body: 'b1', headers: 'req.headers' }});
      logger.log('info','payment service started');
      logger.log('info', 'test123');
        let paymentService =  new PaymentService();
        result = paymentService.getPaymentData();
        return formatResponse(JSON.stringify(result));
      break;
  }
};


export const handler = middy(coreHandler)
  .use(jsonBodyParser()) 
  // parses the request body when it's a JSON and converts it to an object
  .use(httpErrorHandler()) // handles common http errors and returns proper responses