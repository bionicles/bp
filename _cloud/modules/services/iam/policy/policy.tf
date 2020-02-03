# find actions here:
# https://docs.aws.amazon.com/en_pv/IAM/latest/UserGuide/reference_policies_actions-resources-contextkeys.html

variable "resource_arns" {
  default = []
}
variable "actions" {
  default = []
}
variable "effect" {  # "Allow" or "Deny"
  default = "Allow"
}
data "aws_iam_policy_document" "document" {
  version = "2012-10-17"
  statement {
    resources = var.resource_arns
    actions = var.actions
    effect = var.effect
  }
}
resource "aws_iam_policy" "policy" {
  policy = data.aws_iam_policy_document.document.json
}

output "arn" {
  value = aws_iam_policy.policy.arn
}
