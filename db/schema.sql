CREATE DATABASE IF NOT EXISTS bp;

CREATE USER IF NOT EXISTS api WITH PASSWORD :password;

GRANT ALL PRIVILEGES ON DATABASE bp TO api;

CREATE SCHEMA IF NOT EXISTS bp

CREATE TABLE bp.users (
    id bigint NOT NULL PRIMARY KEY,
    email text NOT NULL,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz NOT NULL
);

CREATE TABLE bp.goals (
    id bigint NOT NULL PRIMARY KEY,
)

