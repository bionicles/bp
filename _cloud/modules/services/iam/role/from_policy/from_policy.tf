variable "policy_arn" {}
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
module "attach" {
  source     = "../../attach"
  role_names = [aws_iam_role.role.name]
  policy_arn = var.policy_arn
}

output "arn" {
  value = aws_iam_role.role.arn
}
output "name" {
  value = aws_iam_role.role.name
}
