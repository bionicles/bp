revoke all on database bp from public;
revoke all on schema public from public;   
create schema if not exists app;
create extension pgcrypto;
-- functions
CREATE OR REPLACE FUNCTION lower_array(text[]) RETURNS text[] LANGUAGE SQL IMMUTABLE AS
$$
SELECT array_agg(lower(value)) FROM unnest($1) value;
$$;
create
  or replace function set_updated_time() returns trigger as $$ begin if row(NEW.*) is distinct
from row(OLD.*) then NEW.updated = now();
return NEW;
  else return OLD;
end if;
end;
$$ language 'plpgsql';
-- USERS
create table app.users (
  id uuid unique primary key default gen_random_uuid(),
  n bigserial not null,
  created timestamptz default now(),
  updated timestamptz default now(),
  display_name text unique not null check (char_length(display_name) > 2),
  abstract text,
  tags uuid [],
  email_verified boolean not null default false,
  email text unique not null,
  phone_verified boolean default false,
  phone text unique,
  pw text not null,
  blob jsonb,
  address_ids uuid [],
  order_ids uuid [],
  is_test boolean
);
-- roles
create role appuser;
create role anon;
grant usage on schema app to appuser;
grant usage on schema app to anon;
-- columns
grant insert(display_name, email, pw), select(display_name, abstract, tags), update(email_verified) on app.users to anon;
grant insert, select(display_name, abstract, tags), update, delete on app.users to appuser;
-- rows
alter table app.users enable row level security;
create policy app_users_public_attributes on app.users for select using (true);
create policy app_users_self_service on app.users using (current_setting('req.id')::uuid = id);
-- indexes
create index app_users_display_name_index on app.users (display_name); 
create index app_users_address_ids_index on app.users using gin(address_ids);
create index app_users_order_ids_index on app.users using gin(order_ids);
create index app_users_phone_index on app.users (phone);
create index app_users_email_index on app.users (lower(email));
create index app_users_abstract_index on app.users (lower(abstract));
create index app_users_tag_index on app.users using gin(lower_array(tags));
create trigger set_user_updated_time before update on app.users for each row execute procedure set_updated_time();