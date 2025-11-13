import AWS  from "aws-sdk";

export class SendMessage {
  public readonly sqs: any;
  constructor() {
    this.sqs = new AWS.SQS({ apiVersion: process.env.AWS_API_REGION, accessKeyId: process.env.AWS_ACCESS_KEY_ID, secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, region: process.env.AWS_REGION });
  }

  sendQueueMessage(params: any) {
    let response = { "message": "SUCCESS" }
    this.sqs.sendMessage(params, function (err:any, data: any) {
      if (err) {
        console.log("Error", err);
        response["message"] = "FAILURE";
      } else {
        console.log("Success", data.MessageId);
      }
      // return formatResponse(JSON.stringify(response));
    });
  }
}