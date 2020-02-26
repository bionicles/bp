-- -- TEAMS
--   create table app.teams (
--     id uuid unique not null primary key default gen_random_uuid(),
--     n bigserial not null,
--     created timestamptz default now(),
--     updated timestamptz default now(),
--     display_name text unique not null,
--     abstract text,
--     tags text [],
--     superadmin_ids uuid [] not null check (array_length(superadmin_ids, 1) > 0),
--     admin_ids uuid [] not null default [],
--     item_ids uuid [] default [] on delete cascade,
--     public boolean not null default true
--   );
-- alter table app.teams enable row level security;
-- create policy app_teams_public_display_names_and_abstract on app.teams grant
-- select(display_name, abstract, tags, item_ids) using (public);
-- create policy app_teams_users_create_teams on app.teams grant
-- insert on table app.teams using (local.requester_id != anon_user_id);
-- create policy app_teams_superadmins_manage_teams on app.teams grant
-- select,
-- update(
--     display_name,
--     abstract,
--     superadmin_ids,
--     admin_ids,
--     item_ids,
--     public
--   ),
--   delete using (local.requester_id = any(superadmin_ids));
-- create policy app_teams_admins_manage_teams on app.teams grant
-- select,
-- update(abstract, item_ids) using (local.requester_id = any(admin_ids));
-- create index app_teams_superadmin_index on app.teams using gin(superadmin_ids) create index app_teams_admin_index on app.teams using gin(admin_ids) create index app_teams_item_index on app.teams using gin(item_ids) create index app_teams_display_name_index on app.teams (lower(display_name)) create index app_teams_abstract_index on app.teams (lower(abstract)) create index app_teams_tag_index on app.teams (lower(tags)) create trigger set_team_updated_time before
-- update on app.teams for each row execute procedure set_updated_time();
-- users
-- teams
-- items
-- orders
-- shipments
-- subscriptions
-- payments