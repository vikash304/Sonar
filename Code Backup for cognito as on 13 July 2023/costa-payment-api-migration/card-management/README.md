# Serverless Lambda TypeScript Blueprint

Deploys:
1. API Gateway
2. Lambdas

# Blueprint Status

The necessary infrastructure configuration is defined. To deploy the service,
fill out the relevant environment variables

### Working

- API Gateway
- Lambda
- CI (tests, quality checks)
- CD (deployments)
- Dev documentation and conventions
- Serverless plugin TypeScript (no compiler needed)

### Manual

- DNS configs for the services
- Akamai configuration

### Planned

- Swagger boilerplate
- Automated integration tests
- API versioning boilerplate


# Dev documentation

The repository comes bundled with [Middy](https://middy.js.org/) library, which
can be used to neatly organise Lambda function code in this project. Utilise it
whenever possible for increased maintanability, testability and cleanness of the
functions' code.

In the [dev document](docs/development.md) you will find a walk through of the
structure of the blueprint and the intended use for each folder.

# Setup

The [environment variable document](docs/environment.md) contains the configs
needed for a successful deployment. After they're sorted out, the CD pipeline is
ready to be run.
