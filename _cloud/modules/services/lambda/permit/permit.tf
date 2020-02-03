variable "source_service" {}
variable "source_arn" {}
variable "target_fn_name" {}

resource "aws_lambda_permission" "allow_source_to_invoke_target" {
  principal     = "${var.source_service}.amazonaws.com"
  action        = "lambda:InvokeFunction"
  function_name = var.target_fn_name
  source_arn = var.source_arn
}
