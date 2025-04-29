#!/bin/sh

# Check if the database has started
# We could also use ${POSTGRES_PORT:-5432} to provide a default value
if [ -n "$POSTGRES_HOST" ] && [ -n "$POSTGRES_PORT" ]
then
    /usr/local/bin/wait-for-it "$POSTGRES_HOST:$POSTGRES_PORT" --strict --timeout=10
fi