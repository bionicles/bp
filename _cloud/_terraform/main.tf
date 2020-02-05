# why?: deploy 3 tier app

terraform {
  backend "s3" {
    dynamodb_table = "bitpharma-tf-state-lock"
    bucket         = "bitpharma-tf-state-bucket"
    key            = "state/terraform.tfstate"
    region         = "us-east-1"
  }
}
variable "namespace" {
  default = "gp" 
}
variable "name" {
  default = "gitpharma" 
}
variable "region" {
  default = "us-east-1"
}
variable "db_master_user" {}
variable "db_master_pass" {} # $TF_VAR_DB_PASS -> aws-sdk/client/ssm.getParameter 
variable "public_key" {}
variable "stage" {
  default = "dev"
}
variable "dns_zone_id" {
  default = "gitpharma.com"
}
provider "aws" {
  region = "us-east-1"
}

module "vpc" {
  source     = "git::https://github.com/cloudposse/terraform-aws-vpc.git?ref=master"
  stage      = var.stage
  name       = "app"
  cidr_block = "10.0.0.0/16"
}
module "flow_logs" {
  source = "git::https://github.com/cloudposse/terraform-aws-vpc-flow-logs-s3-bucket.git?ref=master"
  stage  = var.stage
  name   = "flow"
  vpc_id = module.vpc.vpc_id
}
module "subnets" {
  source               = "git::https://github.com/cloudposse/terraform-aws-dynamic-subnets.git?ref=tags/0.16.0"
  availability_zones   = ["us-east-1a", "us-east-1b", "us-east-1c"]
  namespace            = var.namespace
  stage                = var.stage
  name                 = var.name
  vpc_id               = module.vpc.vpc_id
  igw_id               = module.vpc.igw_id
  cidr_block           = module.vpc.vpc_cidr_block
  nat_gateway_enabled  = true
  nat_instance_enabled = false
}
# https://www.terraform.io/docs/providers/aws/r/rds_cluster.html
resource "aws_rds_cluster" "aurora_serverless_postgresql" {
  engine                          = "aurora-postgresql"
  engine_mode                     = "serverless"
  engine_version                  = "11.4"
  enabled_cloudwatch_logs_exports = ["audit"]
  enable_http_endpoint            =  true
  master_username                 = var.db_master_user
  master_password                 = var.db_master_pass
  scaling_configuration {
    auto_pause               = true
    max_capacity             = "32"
    min_capacity             = "8"
    seconds_until_auto_pause = 300
  }
}
# must do this in main.tf cuz we can't define sensitive variables in modules (circa 15 nov 2019)
resource "aws_ssm_parameter" "secret" {
  name  = "/${var.name}/db/pass"
  type  = "SecureString"
  value = var.db_master_pass
}
module "show_secret_to_server" {
  source           = "../modules/motifs/secret"
  secret_arn       = aws_ssm_parameter.secret.arn
  viewer_role_name = module.elastic_beanstalk_environment.ec2_instance_profile_role_name
}
module "elastic_beanstalk_application" {
  source      = "git::https://github.com/cloudposse/terraform-aws-elastic-beanstalk-application.git?ref=tags/0.3.0"
  namespace   = var.namespace
  stage       = var.stage
  name        = var.name
}
module "elastic_beanstalk_environment" {
  source                             = "git::https://github.com/cloudposse/terraform-aws-elastic-beanstalk-environment.git?ref=master"
  namespace                          = var.namespace
  stage                              = var.stage
  name                               = var.name
  region                             = var.region
  availability_zone_selector         = "Any 2"
  dns_zone_id                        = var.dns_zone_id
  dns_subdomain                      = "www"
  elastic_beanstalk_application_name = module.elastic_beanstalk_application.elastic_beanstalk_application_name
  instance_type           = "t3.small"
  autoscale_min           = 1
  autoscale_max           = 4
  updating_min_in_service = 0
  updating_max_batch      = 1
  loadbalancer_type       = "application"
  vpc_id                  = module.vpc.vpc_id
  loadbalancer_subnets    = module.subnets.public_subnet_ids
  application_subnets     = module.subnets.private_subnet_ids
  allowed_security_groups = [module.vpc.vpc_default_security_group_id]
  // https://docs.aws.amazon.com/elasticbeanstalk/latest/platforms/platforms-supported.html
  solution_stack_name = "64bit Amazon Linux 2018.03 v4.13.0 running Node.js 12.14.1"
  additional_settings = [
    {
      namespace = "aws:elasticbeanstalk:application:environment"
      name      = "DB_HOST"
      value     = aws_rds_cluster.aurora_serverless_postgresql.endpoint
    },
    {
      namespace = "aws:elasticbeanstalk:application:environment"
      name      = "DB_USER"
      value     = aws_rds_cluster.aurora_serverless_postgresql.master_username
    }
  ]
}
resource "aws_security_group" "bastion-sg" {
  name   = "bastion-sg"
  vpc_id = module.vpc.vpc_id
  ingress {
    protocol    = "tcp"
    from_port   = 22
    to_port     = 22
    cidr_blocks = ["0.0.0.0/0"]
  }
  egress {
    protocol    = -1
    from_port   = 0 
    to_port     = 0 
    cidr_blocks = ["0.0.0.0/0"]
  }
}
resource "aws_key_pair" "bastion_key" {
  key_name   = "bastion-ssh-public-key"
  public_key = var.public_key
}
resource "aws_instance" "bastion" {
  ami                         = "ami-969ab1f6"
  key_name                    = aws_key_pair.bastion_key.key_name
  instance_type               = "t3.nano"
  security_groups             = [aws_security_group.bastion-sg.name]
  associate_public_ip_address = true
}
# aws acm request-certificate --domain-name example.com --subject-alternative-names a.example.com b.example.com *.c.example.com
module "cdn" {
  source           = "git::https://github.com/cloudposse/terraform-aws-cloudfront-s3-cdn.git?ref=master"
  namespace        = var.namespace
  stage            = var.stage
  name             = var.name
  aliases          = ["cdn.${var.dns_zone_id}"]
  parent_zone_name = var.dns_zone_id
}

output "bastion_public_ip" {
  value = aws_instance.bastion.public_ip
  sensitive = true
}
output "db_host" {
  value = aws_rds_cluster.aurora_serverless_postgresql.endpoint
}
output "cdn_zone_id" {
  value = module.cdn.cf_hosted_zone_id
}
# resource "local_file" "api_outputs" {
#   filename = "${path.module}/../../../engage/react/src/state/tf-out.js"
#   content  = <<EOF
# export const dbUrl = "${module.db.url}"
# EOF
# }