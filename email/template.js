const fs = require('fs')
const path = require('path')

const templateFileAsString = fs.readFileSync(path.resolve(__dirname, 'complaint-registration-email-template.tpl.html'), 'utf8');

module.exports = [{
    name: 'ComplaintRegistrationEmail',
    subject: 'Your claim has been submitted',
    html: templateFileAsString
}];