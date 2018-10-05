const dynamodb = require('./dynamodb');

async function complaints(parent, { originalCustomerAccountId }) {
  const params = {
    TableName: process.env.DYNAMODB_COMPLAINTS_TABLE,
    IndexName: 'accountid',
    KeyConditionExpression: 'originalCustomerAccountId = :accountid',
    ExpressionAttributeValues: { ':accountid': originalCustomerAccountId }
  };

  try {
    // console.log('Attempting to retrieve all complaints.');
    const result = await dynamodb.query(params).promise();
    // console.log('Retrieve all complaints completed.');
    return result.Items;
  }
  catch (e) {
    console.error('Error retrieving complaints.', e);
    throw e;
  }
}

module.exports.complaints = complaints;
