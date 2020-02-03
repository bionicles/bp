# why?: deploy 3 tier app

# logs
# vpc
# private subnet
# public subnet
# aurora postgres
# elastic beanstalk env
# elastic beanstalk app (green)
# elastic beanstalk app (blue)
# route53 alias

terraform {
  backend "s3" {
    dynamodb_table = var.state_lock_table_name
    bucket         = var.state_bucket_name
    key            = "state/terraform.tfstate"
    region         = var.aws_region
  }
}
variable "name" {
  default = "bitpharma"
}
variable "state_lock_table_name" {
  default = "bitpharma-tf-state-lock"
}
variable "state_bucket_name" {
  default = "bitpharma-tf-state-bucket"
}
variable "aws_region" {
  default = "us-east-1"
}
variable "DB_PASS" {} # $TF_VAR_DB_PASS -> aws-sdk/client/ssm.getParameter 
variable "stage" {
  default = "dev"
}
provider "aws" {
  region = var.aws_region
}

module "logs" {
  source = "../modules/motifs/logs"
  name   = var.name
}
resource "aws_route53_zone" "dev" {
  name = "gitpharma.com"
}
module "vpc" {
  source     = "git::https://github.com/cloudposse/terraform-aws-vpc.git?ref=master"
  stage      = var.stage
  name       = "app"
  cidr_block = "10.0.0.0/16"
}
# https://www.terraform.io/docs/providers/aws/r/rds_cluster.html
resource "aws_rds_cluster" "aurora serverless postgresql" {
  source                   = "git::https://github.com/cloudposse/terraform-aws-rds-cluster.git?ref=tags/0.15.0"
  stage                    = var.stage
  name                     = "postgres"
  engine                   = "aurora-postgresql"
  engine_mode              = "serverless"
  engine_version           = "11.4"
  enabled_cloudwatch_logs_exports = "audit"
  enable_http_endpoint =  true
  master_username               = var.db_user
  master_password           = var.db_pass
  scaling_configuration = [
    {
      auto_pause               = true
      max_capacity             = "32"
      min_capacity             = "8"
      seconds_until_auto_pause = 300
    }
  ]
}
# must do this in main.tf cuz we can't define sensitive variables in modules (circa 15 nov 2019)
resource "aws_ssm_parameter" "secret" {
  name  = "/${var.name}/db/pass"
  type  = "SecureString"
  value = var.DB_PASS
}
# module "show_secret_to_server" {
#   source           = "../modules/motifs/secret"
#   secret_arn       = aws_ssm_parameter.secret.arn
#   viewer_role_name = module.beanstalk.role_name
# }
# 

module "beanstalk" {}
module "alias" {}

resource "local_file" "api_outputs" {
  filename = "${path.module}/../../../engage/react/src/state/tf-out.js"
  content  = <<EOF
export const dbUrl = "${module.db.url}"
EOF
}
