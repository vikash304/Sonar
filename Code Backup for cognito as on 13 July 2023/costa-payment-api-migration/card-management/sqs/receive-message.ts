import AWS  from "aws-sdk";

export class ReceiveMessage {
  public readonly sqs: any;
  constructor() {
    this.sqs = new AWS.SQS({ apiVersion: process.env.AWS_API_REGION, accessKeyId: process.env.AWS_ACCESS_KEY_ID, secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, region: process.env.AWS_REGION });
  }

  receiveQueueMessage(params: any, queueURL: string){
    let sqsInstance = this.sqs;
    sqsInstance.receiveMessage(params, function(err: any, data: any) {
      if (err) {
        console.log("Receive Error", err);
      } else if (data.Messages) {
        var deleteParams = {
          QueueUrl: queueURL,
          ReceiptHandle: data.Messages[0].ReceiptHandle
        };
        sqsInstance.deleteMessage(deleteParams, function(err: any, data: any) {
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