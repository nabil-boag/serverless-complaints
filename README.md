# Serverless GraphQL API with DynamoDB and offline support

[![Build Status](https://travis-ci.com/nabil-boag/serverless-complaints.svg?branch=master)](https://travis-ci.com/nabil-boag/serverless-complaints)

A serverless AWS Lambda GraphQL Yoga API back by DynamoDB. When complaints
are created SNS messages are published. SNS events trigger a Lambda that 
sends an email via SES.

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

### Prerquisites

* An AWS account with IAM user able to create resources
* A registered Simple Email Service domain. 
* Install Terraform, Serverless and AWS cli

### Create resources with Terraform

Some resources can't be created by Serverless so we use terraform. 

```bash
cd terraform
terraform init
terraform apply
```

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

```bash
terraform destroy
```

```bash
serverless remove
```

