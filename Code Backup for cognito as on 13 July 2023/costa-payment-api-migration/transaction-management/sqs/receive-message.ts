import { AWS } from "aws-sdk";

export class ReceiveMessage {
  public readonly sqs: any;
  constructor() {
    AWS.config.update({region: 'REGION'});
    this.sqs = new AWS.SQS({apiVersion: '2012-11-05'});
  }

  receiveQueueMessage(params: any, queueURL: string){

    this.sqs.receiveMessage(params, function(err, data) {
      if (err) {
        console.log("Receive Error", err);
      } else if (data.Messages) {
        var deleteParams = {
          QueueUrl: queueURL,
          ReceiptHandle: data.Messages[0].ReceiptHandle
        };
        this.sqs.deleteMessage(deleteParams, function(err, data) {
          if (err) {
            console.log("Delete Error", err);
          } else {
            console.log("Message Deleted", data);
          }
        });
      }
    });
  }
}