variable "viewer_role_name" {}
variable "secret_arn" {}

module "define_GetSecret_policy" {
    source = "../../services/iam/policy"
    actions = ["ssm:GetParameter"]
    resource_arns = [var.secret_arn]
}
module "attach_GetSecret_policy_to_viewer_role" {
    source = "../../services/iam/attach"
    policy_arn = module.define_GetSecret_policy.arn
    role_name = var.viewer_role_name
}