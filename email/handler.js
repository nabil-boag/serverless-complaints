'use strict';
const aws = require('aws-sdk');

module.exports.sendComplaintRegistrationEmail = (event, context, callback) => {

  const data = JSON.parse(event.Records[0].Sns.Message);

  const params = {
    Destination: {
      CcAddresses: [
        data.originalCustomerEmail
      ],
      ToAddresses: [
        data.complaintSubmitterEmail
      ]
    },
    Source: process.env.FROM_EMAIL,
    Template: 'ComplaintRegistrationEmail',
    TemplateData: JSON.stringify(data),
    ReplyToAddresses: [
      process.env.REPLY_TO_EMAIL
    ],
  };

  const ses = new aws.SES({ apiVersion: '2010-12-01' });

  return ses.sendTemplatedEmail(params).promise()
    .then((data) => {
      console.log('Email sent', data, params);
      callback(null, {});
    }).catch((err) => {
      console.error('Email failed to send', err);
      callback(null, err);
    });
};

