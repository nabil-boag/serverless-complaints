const { GraphQLServerLambda } = require('graphql-yoga');
const uuid = require('uuid');
const dynamodb = require('./dynamodb');
const sns = require('./sns');

const resolvers = {
  Query: {
    complaints: async (parent, args) => {
      const params = {
        TableName: process.env.DYNAMODB_TABLE
      };
      
      try {
        // console.log('Attempting to retrieve all complaints.');
        const result = await dynamodb.scan(params).promise();
        // console.log('Retrieve all complaints completed.');
        return result.Items;
      } catch (e) {
        // console.error('Error retrieving complaints.');
        throw new Error('Error retrieving complaints');
      }
    },
    complaint: async (parent, { id }) => {
      const params = {
        TableName: process.env.DYNAMODB_TABLE,
        Key: {
          id: id,
        },
      };
      
      try {
        // console.log(`Attempting to retrieve complaint with id ${id}.`);
        const result = await dynamodb.get(params).promise();
        // console.log('Retrieve complaint completed.', params);
        
        return result.Item;
      } catch (e) {
        // console.error('Error retrieving complaint.');
        throw new Error('Error retrieving complaint');
      }
    },
  },
  Mutation: {
    createComplaint: async (parent, args, context) => {
	    const timestamp = new Date().getTime();
	    
      const customerMatched = args.originalCustomerEmail !== 'notacustomer@nabilboag.co.uk';
      if (!customerMatched) {
        throw new Error('The customer details provided could not be matched.');        
      }
      
      const complaintParams = {
        TableName: process.env.DYNAMODB_TABLE,
        Item: {
          id: uuid.v1(),
          createdOn: timestamp,
          updatedOn: timestamp,
          ...args
        },
      };
      
      // save the Complaint
      try {
        console.log('Attempting to save a complaint.');
        await dynamodb.put(complaintParams).promise();
        console.log('Save complete.');
        
        const complaintSNSParams = {
          Message: JSON.stringify(complaintParams.Item),
          TopicArn: `arn:aws:sns:eu-west-1:108610331730:complaintCreated`,
        };
        
        console.log('Attempting to publish to complaintCreated SNS topic.');
        await sns.publish(complaintSNSParams).promise();
        console.log('SNS Publish complete.');
        return complaintParams.Item;
        
      } catch (e) {
        console.error('Error trying to create a complaint.', e);
        throw new Error('Error saving complaint');
      }
    },
  },
};

const typeDefs = `
  type Query {
    complaints: [Complaint!]!,
    complaint(id: String): Complaint!,
  }
  
  type Mutation {
    createComplaint(
    	complaintSubmitterEmail: String!, 
  	  complaintSubmitterName: String!,
  	  isComplaintSubmitterTheOriginalCustomer: Boolean!,
  	  originalCustomerDateOfBirth: String!, 
  	  originalCustomerEmail: String!,
  	  originalCustomerFirstName: String!, 
  	  originalCustomerLastName: String!, 
  	  originalCustomerMobilePhoneNumer: String, 
  	  originalCustomerPostCode: String, 
    ): Complaint!
  }
  
  type Complaint {
  	id: String!,
  	createdOn: String!,
  	updatedOn: String!,
  	complaintSubmitterEmail: String!, 
    complaintSubmitterName: String!,
    isComplaintSubmitterTheOriginalCustomer: Boolean!,
    originalCustomerDateOfBirth: String!, 
    originalCustomerEmail: String!,
    originalCustomerFirstName: String!, 
    originalCustomerLastName: String!, 
    originalCustomerMobilePhoneNumer: String, 
    originalCustomerPostCode: String, 
  }
`;

const lambda = new GraphQLServerLambda({ 
  typeDefs,
  resolvers
});

exports.server = lambda.graphqlHandler;
exports.playground = lambda.playgroundHandler;