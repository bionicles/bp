variable "actions" {}
variable "service" {}
variable "resource_arns" {}

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
module "policy" {
  source = "../../policy"
  actions = var.actions
  resource_arns = var.resource_arns
}
module "attach" {
  source = "../../attach"
  role_name = aws_iam_role.role.name
  policy_arn = module.policy.arn
}

output "arn" {
  value = aws_iam_role.role.arn
}
output "name" {
  value = aws_iam_role.role.name
}
