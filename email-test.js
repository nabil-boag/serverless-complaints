const email = require("./email");

// Create the promise and SES service object
const sendPromise = email.send('eu-west-1', 'Nabil');

// Handle promise's fulfilled/rejected states
sendPromise.then(
  function(data) {
    console.log(data.MessageId);
  }).catch(
    function(err) {
    console.error(err, err.stack);
  });