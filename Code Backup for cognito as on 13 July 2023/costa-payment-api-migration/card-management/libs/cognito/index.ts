import AWS from 'aws-sdk'
import { AdminCreateUserRequest } from 'aws-sdk/clients/cognitoidentityserviceprovider';
import { formatResponse } from '../helpers';

function validateInput(){
    return true;
} 
const cognito = new AWS.CognitoIdentityServiceProvider();

async function createUser(event: any){
    const cognito = new AWS.CognitoIdentityServiceProvider();
    const { email, password } = JSON.parse(event.body)
    const USER_POOL_ID = process.env.USER_POOL_ID;
    const params = {
      UserPoolId: USER_POOL_ID,
        Username: email,
        UserAttributes: [{
            Name: 'email',
            Value: email
          },
          {
            Name: 'email_verified',
            Value: 'true'
          }
        ],
        MessageAction: 'SUPPRESS'
      };
    // const response = await cognito.adminCreateUser(params).promise();  
}

async function setPassword(response: any){
    if (response.User) {
    const paramsForSetPass = {
      Password: 'password',
      UserPoolId: process.env.USER_POOL_ID,
      Username: 'email',
      Permanent: true
    };
    // await cognito.adminSetUserPassword(paramsForSetPass).promise()
  }
  return formatResponse(JSON.stringify({
    message: 'User registration successful'
  }))

}

async function authorise(event:any) {
  const {
  email,
  password
} = JSON.parse(event.body)
const {
  user_pool_id,
  client_id
} = process.env

const params = {
  AuthFlow: "ADMIN_NO_SRP_AUTH",
  UserPoolId: user_pool_id,
  ClientId: client_id,
  AuthParameters: {
    USERNAME: email,
    PASSWORD: password
  }
}

// const response = await cognito.adminInitiateAuth(params).promise();
// return formatResponse(JSON.stringify({
//   message: 'Success',
//   token: response.AuthenticationResult.IdToken
// }))
  
}


   
   
   