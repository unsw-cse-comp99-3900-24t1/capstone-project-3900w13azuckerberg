#!/bin/bash
# entrypoint.sh

# Wait for the database to be ready
echo "Waiting for PostgreSQL to start..."
while ! pg_isready -h db -p 5432 -q -U user1; do
  sleep 10
done
echo "PostgreSQL started."

# Run database migrations
flask db upgrade

# Load initial data
python3 data_loader.py

# Start Flask app
flask run --host=0.0.0.0