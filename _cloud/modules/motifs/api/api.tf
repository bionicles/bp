variable "log_bucket_name" {}
variable "log_bucket_arn" {}
variable "dist_zip_path" {}
variable "name" {}
variable "SERVER_DB_PASS_SSM_PARAMETER_NAME" {}

module "lambda" {
  name                  = var.name
  source                = "../../services/lambda/fn"
  dist_zip_path         = var.dist_zip_path
  environment_variables = {
    DB_ENDPOINT = "redis-12307.c1.us-west-2-2.ec2.cloud.redislabs.com:12307"
    SERVER_DB_PASS_SSM_PARAMETER_NAME = var.SERVER_DB_PASS_SSM_PARAMETER_NAME
  }
}
module "gate" {
  lambda_invoke_arn = module.lambda.invoke_arn
  lambda_name = module.lambda.name
  source = "./api_gateway"
  name = var.name
}

output "lambda_role_name" {
  value = module.lambda.role_name
}
output "url" {
  value = module.gate.url
}
