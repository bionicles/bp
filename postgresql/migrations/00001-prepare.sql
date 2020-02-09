create database if not exists bp;
\c bp;

create schema if not exists app;

set anon_user_id = "anon";

create or replace function set_updated_time()   
returns trigger as $$
begin
   if row(new.*) is distinct from row(old.*) then
      new.updated = now(); 
      return new;
   else
      return old;
   end if;
end;
$$ language 'plpgsql';

-- USERS
create table app.users (
    id uuid unique not null primary key default gen_random_uuid(),
    n bigserial not null,
    created timestamptz default now(),
    updated timestamptz default now(),
    display_name text unique not null check (char_length(display_name) > 2),
    about text,
    tags text[],
    email_verified boolean not null default false,
    email text unique not null,
    phone_verified boolean not null default false,
    phone text unique not null,
    pw text not null,
    cart jsonb,
    address_ids uuid[] foreign key on delete cascade,
    order_ids uuid[] foreign key on delete cascade,
);

alter table app.users enable row level security;

create policy app.users.public_display_names_and_about on app.users grant select(display_name, about, tags) using (true)

create policy app.users.anon_signup on app.users
    grant insert on table app.users using (requester_id = anon_user_id)

create policy app.users.self_service on app.users 
    grant select, update(display_name, about, cart, email, phone, pw, email_verified, phone_verified), delete
    using (requester_id = id);

create index app.users.display_name_index on app.users (lower(display_name))
create index app.users.address_ids_index on app.users (lower(address_ids))
create index app.users.order_ids_index on app.users (lower(order_ids))
create index app.users.phone_index on app.users (lower(phone))
create index app.users.email_index on app.users (lower(email))
create index app.users.about_index on app.users (lower(about))
create index app.users.tag_index on app.users (lower(tags))

create trigger set_user_updated_time before update on app.users
    for each row execute procedure set_updated_time();

-- TEAMS
create table app.teams (
    id uuid unique not null primary key default gen_random_uuid(),
    n bigserial not null,
    created timestamptz default now(),
    updated timestamptz default now(),
    display_name text unique not null,
    about text,
    tags text[],
    superadmin_ids uuid[] not null check (array_length(superadmin_ids, 1) > 0),
    admin_ids uuid[] not null default [],
    item_ids uuid[] default [] on delete cascade,
    public boolean not null default true
);

alter table app.teams enable row level security;

create policy app.teams.public_display_names_and_about on app.teams
    grant select(display_name, about, tags, item_ids) using (public);

create policy app.teams.users_create_teams on app.teams
    grant insert on table app.teams using (requester_id != anon_user_id);

create policy app.teams.superadmins_manage_teams on app.teams 
    grant select, update(display_name, about, superadmin_ids, admin_ids, item_ids, public), delete
    using (requester_id = any(superadmin_ids));

create policy app.teams.admins_manage_teams on app.teams 
    grant select, update(about, item_ids)
    using (requester_id = any(admin_ids));

create index app.teams.superadmin_index on app.teams using gin(superadmin_ids)
create index app.teams.admin_index on app.teams using gin(admin_ids)
create index app.teams.item_index on app.teams using gin(item_ids)
create index app.teams.display_name_index on app.teams (lower(display_name))
create index app.teams.about_index on app.teams (lower(about))
create index app.teams.tag_index on app.teams (lower(tags))

create trigger set_team_updated_time before update on app.teams
    for each row execute procedure set_updated_time();

-- users
-- teams
-- items

-- orders
-- shipments
-- subscriptions 
-- payments 

