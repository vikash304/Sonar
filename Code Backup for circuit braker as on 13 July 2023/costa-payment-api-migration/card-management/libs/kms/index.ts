import AWS from "aws-sdk";
import { Base64EncodedString } from "aws-sdk/clients/elastictranscoder";
import dotenv from 'dotenv';
dotenv.config();

export class KMS {
    public kms: any;
    constructor() {
        this.kms = new AWS.KMS({
            accessKeyId: process.env.AWS_KMS_ACCESS_KEY, //credentials for your IAM user
            secretAccessKey: process.env.AWS_KMS_SECREAT_ACCESS_KEY, //credentials for your IAM user
            region: process.env.AWS_REGION
        });
    }

    async encryptMessage(txtInput: string) {
        return new Promise((resolve, reject) => {
            let buffer = Buffer.from(txtInput);
            const params = {
                KeyId: process.env.KMS_KEY_ID, // The identifier of the CMK to use for encryption. You can use the key ID or Amazon Resource Name (ARN) of the CMK, or the name or ARN of an alias that refers to the CMK.
                Plaintext: buffer// The data to encrypt.
            };
            this.kms.encrypt(params, (err: any, data: any) => {
                if (err) {
                    reject(err);
                } else {
                    let buff = Buffer.from(data.CiphertextBlob);
                    let encryptedBase64data = buff.toString('base64');
                    resolve(encryptedBase64data);
                }
            });
        });
    }

    async decryptMessage(CipherText: Base64EncodedString) {
        return new Promise((resolve, reject) => {
            const buffer = Buffer.from(CipherText, 'base64');
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
