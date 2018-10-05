const dynamodb = require('./dynamodb');

async function complaint(parent, { id }) {
	const params = {
		TableName: process.env.DYNAMODB_COMPLAINTS_TABLE,
		Key: {
			id: id,
		},
	};

	try {
		// console.log(`Attempting to retrieve complaint with id ${id}.`);
		const result = await dynamodb.get(params).promise();
		// console.log('Retrieve complaint completed.', params);

		return result.Item;
	}
	catch (e) {
		console.error('Error retrieving complaint.', e);
		throw e;
	}
}


module.exports.complaint = complaint;
