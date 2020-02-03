variable "policy_arn" {}
variable "role_name" {}

resource "aws_iam_role_policy_attachment" "bob" {
  policy_arn = var.policy_arn
  role      = var.role_name
}


