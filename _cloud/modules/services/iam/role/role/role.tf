variable "service" {}

resource "aws_iam_role" "role" {
  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "",
      "Effect": "Allow",
      "Principal": {
        "Service": "${var.service}.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
EOF
}

output "arn" {
  value = aws_iam_role.role.arn
}
output "name" {
  value = aws_iam_role.role.name
}
