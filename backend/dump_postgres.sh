#!/bin/bash

if [ -f .env ]; then
  export $(cat .env | xargs)
else
  echo ".env file not found!"
  exit 1
fi

HOST=$POSTGRES_HOST
PORT=$DB_PORT
USER=$POSTGRES_USER
DBNAME=$POSTGRES_DATABASE
BACKUP_DIR=$BACKUP_DIR
PASSWORD=$POSTGRES_PASSWORD
TIMESTAMP=$(date +"%Y%m%d%H%M%S")
BACKUP_FILE="$BACKUP_DIR/$DBNAME-$TIMESTAMP.sql"

mkdir -p $BACKUP_DIR

PGPASSWORD="$PASSWORD" pg_dump -h $HOST -p $PORT -U $USER -F c -b -v -f $BACKUP_FILE $DBNAME

if [ $? -eq 0 ]; then
  echo "Backup realizado com sucesso: $BACKUP_FILE"
else
  echo "Erro ao realizar o backup do banco de dados"
fi
