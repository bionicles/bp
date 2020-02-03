variable "log_bucket_name" {}
variable "lambda_name" {}
variable "lambda_arn" {}
variable "name" {}

resource "aws_lb_target_group" "lambda_target_group" {
  name        = "${var.name}-api-lb-fn-tgt-grp"
  target_type = "lambda"
  health_check {
    path = "/graphql"
    port = 80
    healthy_threshold = 6
    unhealthy_threshold = 2
    timeout = 2
    interval = 5
    matcher = "200"  # has to be HTTP 200 or fails
  }
}
module "permit_lb_to_invoke_lambda" {
  source = "../lambda/permit"
  source_arn = aws_lb_target_group.lambda_target_group.arn
  source_service = "elasticloadbalancing"
  target_fn_name = var.lambda_name
}
resource "aws_lb_target_group_attachment" "attach_lambda_target_group" {
  target_group_arn = aws_lb_target_group.lambda_target_group.arn
  depends_on       = [module.permit_lb_to_invoke_lambda]
  target_id        = var.lambda_arn
}
resource "aws_default_vpc" "default" {}
data "aws_subnet_ids" "default" {
  vpc_id = aws_default_vpc.default.id
}
resource "aws_lb" "api_lb" {
  name               = "${var.name}-api-lb"
  load_balancer_type = "application"
  internal           = false
  security_groups    = [aws_default_vpc.default.default_security_group_id]
  subnets            = data.aws_subnet_ids.default.ids
  enable_deletion_protection = false
  access_logs {
    bucket  = var.log_bucket_name
    prefix  =  "lb"
    enabled = true
  }
}
resource "aws_lb_listener" "http_to_lambda_listener" {
  load_balancer_arn = aws_lb.api_lb.arn
  port                 = "80"
  protocol          = "HTTP"
  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.lambda_target_group.arn
  }
}
resource "aws_lb_listener" "https_to_lambda_listener" {
  load_balancer_arn = aws_lb.api_lb.arn
  port                 = "443"
  protocol          = "HTTPS"
  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.lambda_target_group.arn
  }
}

output "url" {
  value = aws_lb.api_lb.dns_name 
}
