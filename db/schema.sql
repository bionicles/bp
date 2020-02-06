create database if not exists bp;
\c bp;

create user if not exists migrator with password :password;
grant all privileges on database bp to api;

create schema if not exists app

create table app.users (
    id uuid not null primary key default gen_random_uuid(),
    num bigserial not null,
    created_at timestamptz default now(),
    updated_at timestamptz not null,
    email text not null,
    pw text not null,
    email_verified boolean not null default false,
);

-- TODO: ensure only a given user can select their password

create table app.offerings (
    id uuid not null primary key default gen_random_uuid(),
    num bigserial not null,
    created_at timestamptz default now(),
    updated_at timestamptz not null,
    label text not null,
    description text not null
)

-- users
-- teams
-- projects
-- offerings
-- orders
-- shipments
-- subscriptions
-- references

