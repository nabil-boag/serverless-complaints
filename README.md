# Serverless GraphQL API with DynamoDB and offline support

[![Build Status](https://travis-ci.com/nabil-boag/serverless-complaints.svg?branch=master)](https://travis-ci.com/nabil-boag/serverless-complaints)

A serverless AWS Lambda GraphQL Yoga API back by DynamoDB. When complaints
are created SNS messages are published. SNS events trigger a Lambda that 
sends an email via SES.

[Demo API available here](https://nowaitr.com/api)

## Local development

### Setup

```bash
npm install
serverless dynamodb install
serverless offline start
serverless dynamodb migrate (this imports schema)
```

You should now be able to navigate to `http://localhost:4200` to view 
the GraphQL playground

## Deploy 

### Prerequisites

* An AWS account with IAM user able to create resources
* A registered Simple Email Service domain. 

### Deploy Serverless Stack


```bash
serverless deploy
```

### Deploy Domain

Manage with the [serverless domain manager](https://github.com/amplify-education/serverless-domain-manager)

If you have registered your domain with Route 53 and hav genereated certificates
you can deploy these with:

```bash
serverless create_domain
```

## Tearing down

Remove email template

```bash
sls ses-template deploy
```
Remove any API Gateway domains

```bash
serverless delete_domain
```

```bash
serverless remove
```


