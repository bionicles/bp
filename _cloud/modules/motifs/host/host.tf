variable "log_bucket_name" {}
variable "site_name" {}

data "template_file" "policy" {
 template = file("${path.module}/public.json")
  vars = {
    site_name = var.site_name
  }
}
resource "aws_s3_bucket" "host" {
  bucket      = var.site_name
  acl         = "public-read"
  website {
    index_document = "index.html"
  }
  policy = data.template_file.policy.rendered
  logging {
    target_bucket = var.log_bucket_name
    target_prefix = "host"
  }
}

output "regional_domain" {
  value = aws_s3_bucket.host.bucket_regional_domain_name
}
output "domain" {
  value = aws_s3_bucket.host.website_domain
}
output "url" {
  value = aws_s3_bucket.host.website_endpoint
}
