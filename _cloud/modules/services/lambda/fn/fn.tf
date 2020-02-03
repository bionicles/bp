variable "dist_zip_path" {
  default = ""
}
variable "handler_path" {
  default = "dist/server.handler"
}
variable "actions" {
  default = []
}
variable "name" {}
variable "environment_variables" {
  default = {}
}
variable "secrets" {
  default = []
}

resource "aws_default_vpc" "default" {}
data "aws_subnet_ids" "default" {
  vpc_id = aws_default_vpc.default.id
}

module "role" {
  source        = "../../iam/role/from_actions"
  actions       = concat(var.actions, ["logs:CreateLogGroup", "logs:CreateLogStream", "logs:PutLogEvents", "ec2:CreateNetworkInterface", "ec2:DescribeNetworkInterfaces", "ec2:DeleteNetworkInterface"])
  resource_arns = ["*"]
  service       = "lambda"
}
resource "aws_s3_bucket" "bucket" {
  bucket = "${var.name}-l-fn-pkg-obj"
  acl    = "private"
  versioning {
    enabled = true
  }
}
resource "aws_s3_bucket_object" "object" {
  bucket = aws_s3_bucket.bucket.id
  key    = "${var.name}-l-fn-pkg-obj"
  source = var.dist_zip_path
  etag   = filemd5(var.dist_zip_path)
}
resource "aws_lambda_function" "lambda" {
  s3_bucket         = aws_s3_bucket.bucket.id
  s3_key            = aws_s3_bucket_object.object.key
  s3_object_version = aws_s3_bucket_object.object.version_id
  role              = module.role.arn
  handler           = var.handler_path
  function_name     = "${var.name}_lambda"
  runtime           = "nodejs10.x"
  timeout           = "90"
  environment {
    variables = merge(var.environment_variables, { project_name = var.name })
  }
  # vpc_config {
  #   subnet_ids         = data.aws_subnet_ids.default.ids
  #   security_group_ids = [aws_default_vpc.default.default_security_group_id]
  # }
}

output "invoke_arn" {
  value = aws_lambda_function.lambda.invoke_arn
}
output "arn" {
  value = aws_lambda_function.lambda.arn
}
output "role_name" {
  value = module.role.name
}
output "name" {
  value = aws_lambda_function.lambda.function_name
}
