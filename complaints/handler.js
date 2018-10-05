const { GraphQLServerLambda } = require('graphql-yoga');

const { complaints } = require('./complaints');
const { complaint } = require('./complaint');
const { createComplaint } = require('./createComplaint');
const { createCustomer } = require('./createCustomer');

const resolvers = {
  Query: {
    complaints: complaints,
    complaint: complaint
  },
  Mutation: {
    createComplaint: createComplaint,
    createCustomer: createCustomer
  }
};

const typeDefs = `
  type Query {
    complaints(originalCustomerAccountId: String!): [Complaint!]!,
    complaint(id: String!): Complaint!,
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
    ): Complaint!,
    createCustomer(
      originalCustomerAccountId: String!,
  	  originalCustomerDateOfBirth: String!, 
  	  originalCustomerEmail: String!,
  	  originalCustomerMobilePhoneNumer: String, 
  	  originalCustomerPostCode: String, 
    ): Customer!
  }
  
  type Complaint {
  	id: String!,
  	createdOn: String!,
  	updatedOn: String!,
  	originalCustomerAccountId: String!,
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
  
  type Customer {
  	originalCustomerAccountId: String!,
    originalCustomerDateOfBirth: String!, 
    originalCustomerEmail: String!,
    originalCustomerMobilePhoneNumer: String!, 
    originalCustomerPostCode: String!, 
  }
`;

const lambda = new GraphQLServerLambda({ 
  typeDefs,
  resolvers
});

exports.server = lambda.graphqlHandler;
exports.playground = lambda.playgroundHandler;