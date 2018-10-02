'use strict';

// Load the AWS SDK for Node.js
const aws = require('aws-sdk');
const fromEmail = process.env.FROM_EMAIL;
const replyToEmail = process.env.REPLY_TO_EMAIL;

module.exports = {
	send: () => {
		// Create sendEmail params 
		var params = {
		  Destination: { /* required */
		    CcAddresses: [
		      'cctest@nabilboag.co.uk',
		      /* more items */
		    ],
		    ToAddresses: [
		      'totest@nabilboag.co.uk',
		      /* more items */
		    ]
		  },
		  Message: { /* required */
		    Body: { /* required */
		      Html: {
			      Charset: "UTF-8",
			      Data: `<html><body><h1>Hello @TODO</body></html>`
		      },
		     },
		     Subject: {
		      Charset: 'UTF-8',
		      Data: 'Test email'
		     }
		    },
		  Source: fromEmail, /* required */
		  ReplyToAddresses: [
	    	replyToEmail
		  ],
		};       
		
		// Create the promise and SES service object
		return new aws.SES({apiVersion: '2010-12-01'}).sendEmail(params).promise();
	}
};