# Environment variables
Add the following variables and secrets to GitHub Actions target environment.

## Secrets
| Secret name               | Meaning |
| ------------------------- | ------- |
| AWS_ACCESS_KEY_ID         | Access key ID for AWS.
| AWS_SECRET_ACCESS_KEY     | Secret access key for AWS.
| ROLE_TO_ASSUME            | The role ARN to be used on AWS for deployment.

## Variables
| Variable name             | Meaning |
| ------------------------- | ------- |
| LOG_LEVEL                 | Currently unused.
| NODE_ENV                  | Tells NodeJS if the running environment should match production or not. Should be set to 'development' or 'production'.
| REGION                    | The target AWS deployment region.
