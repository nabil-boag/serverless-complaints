# Serverless GraphQL API with DynamoDB and offline support

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
