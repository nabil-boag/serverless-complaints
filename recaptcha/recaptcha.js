const recaptcha = require('recaptcha-validator')

module.exports.verify = (response, remoteip = undefined) => {
	console.log('Checking caphca with IP:', remoteip);
	return recaptcha(process.env.RECAPTCHA_SECRET_KEY, response, remoteip);
}	
