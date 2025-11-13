import AWS  from "aws-sdk";

export class SQS {
  public readonly sqs: any;
  constructor() {
    this.sqs = new AWS.SQS({ apiVersion: process.env.AWS_API_REGION, accessKeyId: process.env.AWS_ACCESS_KEY_ID, secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, region: process.env.AWS_REGION });
  }
  
  // For Fifo Queue
  async sendQueueMessage(params: any) {      
    let queueRes = await this.sqs.sendMessage(params).promise();
    const response = {
        statusCode: 200,
        body: queueRes,
    };    
    return response;
  };

  async receiveQueueMessage(params: any) {
    let queueRes = await this.sqs.receiveMessage(params).promise();
    const response = {
        statusCode: 200,
        body: queueRes,
    };    
    return response;
  };

  async deleteQueueMessage(receiptHandle: any, queueURL: string){
    var deleteParams = {
      QueueUrl: queueURL,
      ReceiptHandle: receiptHandle
    };
    var removedMessage = await this.sqs.deleteMessage(deleteParams).promise();
    console.log('removed message');
    console.log(removedMessage);
    const response = {
        statusCode: 200,
        body: removedMessage,
    };    
    return response;    
  }

}
