aws rds restore-db-cluster-to-point-in-time \
    --source-db-cluster-identifier $1 \
    --db-cluster-identifier $2 \
    --restore-type $3 \
    --use-latest-restorable-time