'use strict';

const AWS = require('aws-sdk'); 

let options = {};

// connect to local sns if running offline
if (process.env.IS_OFFLINE) {
  options = {
    endpoint: "http://127.0.0.1:4002",
    region: "localhost"
  };
}

const client = new AWS.SNS(options);

module.exports = client;