variable "log_bucket_name" {}
variable "host_domain" {}
variable "name" {}
locals {
  s3_origin_id = "host"
}

resource "aws_cloudfront_origin_access_identity" "host" {}
resource "aws_cloudfront_distribution" "cdn" {
  default_root_object = "index.html"
  origin {
    domain_name = var.host_domain
    origin_id = local.s3_origin_id
    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.host.cloudfront_access_identity_path
    }
  }
  default_cache_behavior {
    viewer_protocol_policy = "redirect-to-https"
    compress               = true
    allowed_methods        = ["GET", "HEAD"]
    cached_methods         = ["GET", "HEAD"]
    target_origin_id       = local.s3_origin_id
    min_ttl                = 0
    default_ttl            = 86400
    max_ttl                = 31536000
    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }
  }
  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }
  enabled = true
  viewer_certificate {
    cloudfront_default_certificate = true
  }
  logging_config {
      include_cookies = false
      bucket          = "${var.log_bucket_name}.s3.amazonaws.com"
      prefix          = "cdn"
  }
}

output "access_id_path" {
  value = aws_cloudfront_origin_access_identity.host.cloudfront_access_identity_path
}
output "s3_canonical_user_id" {
  value = aws_cloudfront_origin_access_identity.host.s3_canonical_user_id
}
output "arn" {
  value = aws_cloudfront_distribution.cdn.arn
}
output "url" {
  value = aws_cloudfront_distribution.cdn.domain_name
}
output "id" {
  value = aws_cloudfront_distribution.cdn.id
}
