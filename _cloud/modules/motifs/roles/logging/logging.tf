variable "service" {}

module "logging_policy" {
    source = "../../policies/logging"
}
module "logging_role" {
    source = "../../../services/iam/role/from_policy"
    policy_arn = module.logging_policy.arn
    service = var.service
}

output "arn" {
    value = module.logging_role.arn
}
output "name" {
    value = module.logging_role.name
}