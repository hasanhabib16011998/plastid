#!/usr/bin/env bash
set -euo pipefail

# Navigate to script directory (project root)
cd "$(dirname "$0")"

# Load environment variables from .env if present
if [ -f .env ]; then
  set -a
  source .env
  set +a
fi

PG_CONTAINER="${PG_CONTAINER:-plastid-prod-postgres}"
NETWORK="${DOCKER_NETWORK:-plastid-prod_default}"
PG_USER="${POSTGRES_USER:-payload}"
PG_DB="${POSTGRES_DB:-plastid_cms}"
MINIO_USER="${MINIO_ROOT_USER:-minioadmin}"
MINIO_PASS="${MINIO_ROOT_PASSWORD:-minioadmin_secure_password}"
BACKUP_BUCKET="${BACKUP_BUCKET:-plastid-backups}"

TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILE="${PG_DB}_${TIMESTAMP}.sql.gz"
TMP_PATH="/tmp/${BACKUP_FILE}"

cleanup() {
  rm -f "$TMP_PATH"
}
trap cleanup EXIT

echo "[1/3] Dumping database '${PG_DB}' from container '${PG_CONTAINER}'..."
docker exec "$PG_CONTAINER" pg_dump -U "$PG_USER" -d "$PG_DB" --clean --if-exists | gzip > "$TMP_PATH"

echo "[2/3] Uploading ${BACKUP_FILE} to MinIO bucket '${BACKUP_BUCKET}'..."
docker run --rm \
  --network "$NETWORK" \
  -v "${TMP_PATH}:/tmp/${BACKUP_FILE}:ro" \
  --entrypoint /bin/sh \
  quay.io/minio/mc:latest -c "
    mc alias set myminio http://minio:9000 '$MINIO_USER' '$MINIO_PASS' >/dev/null &&
    mc mb --ignore-existing myminio/$BACKUP_BUCKET &&
    mc cp /tmp/$BACKUP_FILE myminio/$BACKUP_BUCKET/$BACKUP_FILE &&
    mc ls myminio/$BACKUP_BUCKET/$BACKUP_FILE
  "

echo "[3/3] Cleaning up temporary file..."
echo "Done! Backup stored in MinIO at: ${BACKUP_BUCKET}/${BACKUP_FILE}"
