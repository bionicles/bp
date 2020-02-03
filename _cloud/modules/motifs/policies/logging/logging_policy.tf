module "policy" {
  source  = "../../../services/iam/policy"
  actions = [
    "logs:CreateLogGroup",
    "logs:CreateLogStream",
    "logs:DescribeLogGroups",
    "logs:DescribeLogStreams",
    "logs:PutLogEvents",
    "logs:GetLogEvents",
    "logs:FilterLogEvents"
  ]
  resource_arns = ["*"]
}

output "arn" {
    value = module.policy.arn
}
