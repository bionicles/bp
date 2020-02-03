# https://docs.aws.amazon.com/elasticloadbalancing/latest/application/load-balancer-access-logs.html#access-logging-bucket-permissions
# data "aws_elb_service_account" "for_this_region" {}
data "aws_caller_identity" "current" {}
variable "name" {}

resource "aws_s3_bucket" "logs" {
    bucket = "${var.name}-logs" # aka "bucket name"
    acl = "log-delivery-write"
}
data "aws_iam_policy_document" "logs_bucket_policy" {
    statement {
        sid       = "allow host to put logs"
        actions   = ["s3:PutObject"]
        resources = ["arn:aws:s3:::${aws_s3_bucket.logs.bucket}/*"]
        principals {
            type        = "AWS"
            identifiers = ["arn:aws:iam::${data.aws_caller_identity.current.account_id}:root"]
        }
    }
    statement {
        sid       = "allow cdn to put logs"
        actions   = ["s3:PutObject"]
        resources = ["arn:aws:s3:::${aws_s3_bucket.logs.bucket}/*"]
        principals {
            type        = "AWS"
            identifiers = ["arn:aws:iam::${data.aws_caller_identity.current.account_id}:root"]
        }
    }
}
resource "aws_s3_bucket_policy" "logs" {
    bucket = aws_s3_bucket.logs.bucket
    policy = data.aws_iam_policy_document.logs_bucket_policy.json
}

output "bucket_domain_name" {
    value = aws_s3_bucket.logs.bucket_domain_name
}
output "arn" {
    value = aws_s3_bucket.logs.arn
}
output "id" {
    value = aws_s3_bucket.logs.id
}
output "name" {
    value = aws_s3_bucket.logs.bucket
}