const uuid = require('uuid');
const dynamodb = require('./dynamodb');
const sns = require('./sns');

async function createComplaint(parent, args, context) {
	const timestamp = new Date().getTime();

	const accountId = await getAccountIdByComplaintData(args);
	
	const complaintParams = {
		TableName: process.env.DYNAMODB_COMPLAINTS_TABLE,
		Item: {
			id: uuid.v1(),
			createdOn: timestamp.toString(),
			updatedOn: timestamp.toString(),
			originalCustomerAccountId: accountId,
			...args
		},
	};

	// save the Complaint
	try {
		// console.log('Attempting to save a complaint.');
		await dynamodb.put(complaintParams).promise();
		// console.log('Save complete.');

		const complaintSNSParams = {
			Message: JSON.stringify(complaintParams.Item),
			TopicArn: `arn:aws:sns:eu-west-1:108610331730:complaintCreated`,
		};

		// console.log('Attempting to publish to complaintCreated SNS topic.');
		await sns.publish(complaintSNSParams).promise();
		// console.log('SNS Publish complete.');
		return complaintParams.Item;

	}
	catch (e) {
		console.error('Error trying to create a complaint.', e);
		throw e
	}
}

async function getAccountIdByComplaintData(data) {
	let accountId = null;
	
	accountId = await getAccountIdByEmailAndDateOfBirth(data.originalCustomerEmail, data.originalCustomerDateOfBirth);
	
	if (accountId !== null) {
		return accountId
	}
	
	accountId = await getAccountIdByPostCodeAndDateOfBirth(data.originalCustomerPostCode, data.originalCustomerDateOfBirth);
	
	if (accountId !== null) {
		return accountId
	}
	
	accountId = await getAccountIdByMobilePhoneAndDateOfBirth(data.originalCustomerMobilePhoneNumber, data.originalCustomerDateOfBirth);
	
	if (accountId !== null) {
		return accountId
	}
	
	throw new Error('The customer details provided could not be matched.');
}

async function getAccountIdByEmailAndDateOfBirth(email, dateOfBirth){
	const params = {
		TableName: process.env.DYNAMODB_CUSTOMER_TABLE,
		IndexName: 'originalCustomerEmailDateOfBirth',
		KeyConditionExpression: 'originalCustomerEmail = :originalCustomerEmail and originalCustomerDateOfBirth = :originalCustomerDateOfBirth',
		ExpressionAttributeValues: { 
			':originalCustomerEmail': email,
			':originalCustomerDateOfBirth': dateOfBirth,
		}
	};
	
	try {
		console.log('Attempting to match email and dob.');
		const result = await dynamodb.query(params).promise();
		console.log('Retrieve completed.');
		
		if (result.Items.length > 0) {
			return result.Items[0].originalCustomerAccountId;
		}
		
		return null;
	} catch (e) {
	 	console.error('Error retrieving complaints.', e);
	 	throw new Error('Error retrieving complaints');
	}
}

async function getAccountIdByPostCodeAndDateOfBirth(postCode, dateOfBirth){
	const params = {
		TableName: process.env.DYNAMODB_CUSTOMER_TABLE,
		IndexName: 'originalCustomerPostCodeDateOfBirth',
		KeyConditionExpression: 'originalCustomerPostCode = :originalCustomerPostCode and originalCustomerDateOfBirth = :originalCustomerDateOfBirth',
		ExpressionAttributeValues: { 
			':originalCustomerPostCode': postCode,
			':originalCustomerDateOfBirth': dateOfBirth,
		}
	};
	
	try {
		console.log('Attempting to match postcode and dob.');
		const result = await dynamodb.query(params).promise();
		console.log('Retrieve completed.');
		
		if (result.Items.length > 0) {
			return result.Items[0].originalCustomerAccountId;
		}
		
		return null;
	} catch (e) {
	 	console.error('Error retrieving complaints.', e);
	 	throw new Error('Error retrieving complaints');
	}
}

async function getAccountIdByMobilePhoneAndDateOfBirth(mobilePhoneNumber, dateOfBirth){
	const params = {
		TableName: process.env.DYNAMODB_CUSTOMER_TABLE,
		IndexName: 'originalCustomerMobilePhoneNumberDateOfBirth',
		KeyConditionExpression: 'originalCustomerMobilePhoneNumber = :originalCustomerPostCode and originalCustomerDateOfBirth = :originalCustomerDateOfBirth',
		ExpressionAttributeValues: { 
			':originalCustomerPostCode': mobilePhoneNumber,
			':originalCustomerDateOfBirth': dateOfBirth,
		}
	};
	
	try {
		console.log('Attempting to match mobile number and dob.');
		const result = await dynamodb.query(params).promise();
		console.log('Retrieve completed.');
		
		if (result.Items.length > 0) {
			return result.Items[0].originalCustomerAccountId;
		}
		
		return null;
	} catch (e) {
	 	console.error('Error retrieving complaints.', e);
	 	throw new Error('Error retrieving complaints');
	}
}

module.exports.createComplaint = createComplaint;
