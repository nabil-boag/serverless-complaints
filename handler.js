const { GraphQLServerLambda } = require('graphql-yoga')

const typeDefs = `
  type Query {
    hello(name: String): String
  }
`

const resolvers = {
  Query: {
    hello: (_,{ name }) => `Hello ${name || 'world'}`
  }
}

const lambda = new GraphQLServerLambda({ 
  typeDefs,
  resolvers
})

exports.server = lambda.graphqlHandler
exports.playground = lambda.playgroundHandler

// const {
//   graphql,
//   GraphQLSchema,
//   GraphQLObjectType,
//   GraphQLString,
//   GraphQLNonNull,
// } = require('graphql');

// const email = require("./email");

// const submitClaim = (parent, args, context) => {
//   // if (accountNotMatched) {
//   //   throw new Error('AccountNotMatched');
//   // }
//   // Create the promise and SES service object
//   return email.send().then(() => {
//     return 'Yolo';
//   });
// }
  
// const schema = new GraphQLSchema({
//   query: new GraphQLObjectType({
//     name: 'RootQueryType', // an arbitrary name
//     fields: {
//       // the query has a field called 'greeting'
//       greeting: {
//         // we need to know the user's name to greet them
//         args: { firstName: { name: 'firstName', type: new GraphQLNonNull(GraphQLString) } },
//         // the greeting message is a string
//         type: GraphQLString,
//         // resolve to a greeting message
//         resolve: (parent, args) => `Hello, ${args.firstName}.`,
//       },
//     },
//   }),
//   mutation: new GraphQLObjectType({
//     name: 'RootMutationType', // an arbitrary name
//     fields: {
//       changeNickname: {
//         args: {
//           firstName: { name: 'firstName', type: new GraphQLNonNull(GraphQLString) },
//           nickname: { name: 'nickname', type: new GraphQLNonNull(GraphQLString) },
//         },
//         type: GraphQLString,
//         resolve: submitClaim,
//       },
//     },
//   }),
// });

// // We want to make a GET request with ?query=<graphql query>
// // The event properties are specific to AWS. Other providers will differ.
// module.exports.query = (event, context, callback) =>
//   graphql(schema, event.queryStringParameters.query)
//   .then(
//     result => callback(null, { statusCode: 200, body: JSON.stringify(result) }),
//     err => callback(err)
//   );