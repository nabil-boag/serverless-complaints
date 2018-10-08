'use strict';

module.exports.landingPage = (event, context, callback) => {
  let sitekey = process.env.RECAPTCHA_SITE_KEY;

  const html = `
  <html>
  	<head>
  		<script src='https://www.google.com/recaptcha/api.js'></script>
  		<script>
  		function captchaCallback (code) {
  			const codeEl = document.createElement('p');
  			codeEl.appendChild(document.createTextNode(code));
  			document.body.appendChild(codeEl);
  		};
      </script>
  	</head>
    
    <body>
      <h1>Landing Page</h1>
      <div class="g-recaptcha" data-sitekey="${sitekey}" data-callback="captchaCallback"></div>
    </body>
  </html>`;

  const response = {
    statusCode: 200,
    headers: {
      'Content-Type': 'text/html',
    },
    body: html,
  };

  // callback is sending HTML back
  callback(null, response);
};