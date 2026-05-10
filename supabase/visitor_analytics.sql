create extension if not exists pgcrypto;

create table if not exists public.visitor_analytics_events (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default timezone('utc', now()),
  event_type text not null default 'pageview',
  path text not null,
  href text not null,
  session_id uuid,
  ip text,
  country text,
  city text,
  browser_name text,
  os_name text,
  device_type text,
  payload jsonb not null
);

create index if not exists visitor_analytics_events_created_at_idx
  on public.visitor_analytics_events (created_at desc);

create index if not exists visitor_analytics_events_path_idx
  on public.visitor_analytics_events (path);

alter table public.visitor_analytics_events enable row level security;

revoke all on public.visitor_analytics_events from anon;
revoke all on public.visitor_analytics_events from authenticated;
