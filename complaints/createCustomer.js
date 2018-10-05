const dynamodb = require('./dynamodb');

async function createCustomer(parent, args, context) {
	const customerParams = {
		TableName: process.env.DYNAMODB_CUSTOMER_TABLE,
		Item: args
	};

	try {
		// console.log('Attempting to save a customer.');
		await dynamodb.put(customerParams).promise();
		// console.log('Save customer complete.');
		return args;

	}
	catch (e) {
		console.error('Error trying to create a customer.', e);
		throw e
	}
}

module.exports.createCustomer = createCustomer;
