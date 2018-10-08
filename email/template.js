const fs = require('fs')
const path = require('path')

module.exports = [{
  name: 'ComplaintRegistrationEmail',
  subject: 'Your claim has been submitted',
  html: fs.readFileSync(path.resolve(__dirname, 'complaint-registration-email-template.tpl.html'), 'utf8')
}, {
  name: 'ComplaintRegistrationEmailOriginalCustomer',
  subject: 'A claim has been submitted for your account',
  html: fs.readFileSync(path.resolve(__dirname, 'complaint-registration-original-customer-email-template.tpl.html'), 'utf8')
}];
