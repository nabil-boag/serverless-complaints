# Specify the provider and access details
provider "aws" {
  region = "${var.aws_region}"
}

resource "aws_ses_template" "ComplaintRegistrationEmail" {
  name    = "ComplaintRegistrationEmail"
  subject = "Your claim has been submitted"
  html    = "${file("complaint-registration-email-template.tpl.html")}"
}
