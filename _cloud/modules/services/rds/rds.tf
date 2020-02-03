variable "RDS_MASTER_USERNAME" {}
variable "RDS_MASTER_PASSWORD" {}
variable "name" {}

data "aws_availability_zones" "available" {
  state = "available"
}
resource "random_shuffle" "availability_zones" {
  input = data.aws_availability_zones.available.names
  result_count = 3
}
resource "aws_rds_cluster" "postgresql" {
  availability_zones        = random_shuffle.availability_zones.result
  cluster_identifier        = "${var.name}-aurora-cluster"
  engine                    = "aurora-postgresql"
  engine_mode               = "serverless"
  database_name             = "${var.name}_database"
  master_username           = var.RDS_MASTER_USERNAME
  master_password           = var.RDS_MASTER_PASSWORD
  backup_retention_period   = 8
  skip_final_snapshot       = false
  final_snapshot_identifier = "${var.name}-final-snapshot"
  preferred_backup_window   = "04:00-09:00"
  scaling_configuration {
    timeout_action           = "ForceApplyCapacityChange"
    seconds_until_auto_pause = 300
    max_capacity             = 16
    min_capacity             = 2
    auto_pause               = true
  }
}

output "endpoint" {
  value = aws_rds_cluster.postgresql.endpoint
}
