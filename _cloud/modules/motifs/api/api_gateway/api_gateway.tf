variable "name" {}
variable "lambda_name" {}
variable "lambda_invoke_arn" {}
variable "stage_name" {
  default = "dev"
}
variable "request_templates" {
  default = {
    "application/json" = "{ \"statusCode\": 200 }"
  }
}

module "logging_role" {
  source  = "../../../services/iam/role/from_actions"
  actions = [
    "logs:CreateLogGroup",
    "logs:CreateLogStream",
    "logs:DescribeLogGroups",
    "logs:DescribeLogStreams",
    "logs:PutLogEvents",
    "logs:GetLogEvents",
    "logs:FilterLogEvents"
  ]
  service = "apigateway"
  resource_arns = ["*"]
}
resource "aws_api_gateway_account" "account" {
  cloudwatch_role_arn = module.logging_role.arn
}
# https://learn.hashicorp.com/terraform/aws/lambda-api-gateway
resource "aws_api_gateway_rest_api" "rest_api" {
  name = "${var.name}_api_gateway_rest_api"
}
resource "aws_api_gateway_resource" "proxy" {
  path_part   = "{proxy+}"
  parent_id   = aws_api_gateway_rest_api.rest_api.root_resource_id
  rest_api_id = aws_api_gateway_rest_api.rest_api.id
}
resource "aws_api_gateway_method" "options_method" {
  rest_api_id   = aws_api_gateway_rest_api.rest_api.id
  resource_id   = aws_api_gateway_resource.proxy.id
  http_method   = "OPTIONS"
  authorization = "NONE"
}
resource "aws_api_gateway_method_response" "options_200" {
  rest_api_id = aws_api_gateway_rest_api.rest_api.id
  resource_id = aws_api_gateway_resource.proxy.id
  http_method = "OPTIONS"
  status_code = "200"
  response_parameters = {
    "method.response.header.Access-Control-Allow-Headers" = true
    "method.response.header.Access-Control-Allow-Methods" = true
    "method.response.header.Access-Control-Allow-Origin"  = true
  }
  depends_on = [aws_api_gateway_method.options_method]
}
resource "aws_api_gateway_integration" "options_integration" {
  rest_api_id = aws_api_gateway_rest_api.rest_api.id
  resource_id = aws_api_gateway_resource.proxy.id
  http_method = "OPTIONS"
  type        = "MOCK"
  request_templates = var.request_templates
  depends_on = [aws_api_gateway_method.options_method]
}
resource "aws_api_gateway_integration_response" "options_integration_response" {
  rest_api_id = aws_api_gateway_rest_api.rest_api.id
  resource_id = aws_api_gateway_resource.proxy.id
  http_method ="OPTIONS"
  status_code = 200
  response_parameters = {
    "method.response.header.Access-Control-Allow-Headers" = "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'"
    "method.response.header.Access-Control-Allow-Methods" = "'OPTIONS,GET,POST'"
    "method.response.header.Access-Control-Allow-Origin"  = "'*'"
  }
  depends_on = [aws_api_gateway_method_response.options_200]
}
resource "aws_api_gateway_method" "any" {
  rest_api_id   = aws_api_gateway_rest_api.rest_api.id
  resource_id   = aws_api_gateway_resource.proxy.id
  http_method   = "ANY"
  authorization = "NONE"
}
module "permit_api_to_invoke_lambda" {
  source = "../../../services/lambda/permit"
  # "/*/*" grants access from any method on any resource
  source_arn     = "${aws_api_gateway_rest_api.rest_api.execution_arn}/*/*/*"
  source_service = "apigateway"
  target_fn_name = var.lambda_name
}
resource "aws_api_gateway_integration" "integrate_lambda_with_api" {
  rest_api_id             = aws_api_gateway_rest_api.rest_api.id
  resource_id             = aws_api_gateway_resource.proxy.id
  uri                     = var.lambda_invoke_arn
  type                    = "AWS_PROXY"
  integration_http_method = "POST"
  http_method             = "ANY"
}
resource "aws_api_gateway_method_settings" "general_settings" {
  rest_api_id = aws_api_gateway_rest_api.rest_api.id
  stage_name  = aws_api_gateway_deployment.deployment.stage_name
  method_path = "*/*"
  settings {
    # Enable CloudWatch logging and metrics
    metrics_enabled    = true
    data_trace_enabled = true
    logging_level      = "INFO"
    # Limit the rate of calls to prevent abuse and unwanted charges
    throttling_rate_limit  = 100
    throttling_burst_limit = 50
  }
}
resource "aws_api_gateway_deployment" "deployment" {
  stage_description = timestamp()
  rest_api_id       = aws_api_gateway_rest_api.rest_api.id
  depends_on        = [aws_api_gateway_rest_api.rest_api]
  stage_name        = var.stage_name
}

output "url" {
  value = aws_api_gateway_deployment.deployment.invoke_url
}
output "id" {
  value = aws_api_gateway_rest_api.rest_api.id
}
output "resource_id" {
  value = aws_api_gateway_resource.proxy.id
}
