# Specify the provider and access details
provider "aws" {
  region = "${var.aws_region}"
}

resource "aws_ses_template" "ComplaintRegistrationEmail" {
  name    = "ComplaintRegistrationEmail"
  subject = "Greetings, {{name}}!"
  html    = "${file("complaint-registration-email-template.tpl.html")}"
}

