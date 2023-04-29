# Use the official PostgreSQL image as the base image
FROM postgres:latest

# Set environment variables for the PostgreSQL database
ENV POSTGRES_USER=postgres \
    POSTGRES_PASSWORD=postgres \
    POSTGRES_DB=whosplaying

# Copy the SQL dump file into the container
COPY dump.sql /docker-entrypoint-initdb.d/

# Expose the PostgreSQL port (optional)
EXPOSE 5432