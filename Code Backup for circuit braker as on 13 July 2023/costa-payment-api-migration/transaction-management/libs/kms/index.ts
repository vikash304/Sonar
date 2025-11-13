import AWS from "aws-sdk";
import dotenv from 'dotenv';
dotenv.config();

export class KMS {
    public kms: any;
    constructor() {
        this.kms = new AWS.KMS({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID, //credentials for your IAM user
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, //credentials for your IAM user
            region: process.env.AWS_REGION
        });
    }

    async encryptMessage(txtInput: string) {
        return new Promise((resolve, reject) => {
            let buffer = Buffer.from(txtInput);
            const params = {
                KeyId: process.env.AWS_KMS_TEST_KEY, // The identifier of the CMK to use for encryption. You can use the key ID or Amazon Resource Name (ARN) of the CMK, or the name or ARN of an alias that refers to the CMK.
                Plaintext: buffer// The data to encrypt.
            };
            this.kms.encrypt(params, (err: any, data: any) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data.CiphertextBlob);
                }
            });
        });
    }

    async decryptMessage(buffer: any) {
        return new Promise((resolve, reject) => {
            const params = {
                CiphertextBlob: buffer// The data to dencrypt.
            };

            this.kms.decrypt(params, (err: any, data: any) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data.Plaintext.toString('utf-8'));
                }
            });
        });
    }
}
