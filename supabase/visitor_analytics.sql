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

create index if not exists visitor_analytics_events_session_created_at_idx
  on public.visitor_analytics_events (session_id, created_at desc)
  where session_id is not null;

create index if not exists visitor_analytics_events_ip_created_at_idx
  on public.visitor_analytics_events (ip, created_at desc)
  where ip is not null;

create index if not exists visitor_analytics_events_type_created_at_idx
  on public.visitor_analytics_events (event_type, created_at desc);

alter table public.visitor_analytics_events
  alter column ip set not null;

comment on table public.visitor_analytics_events is
  'Private first-party visitor telemetry. Full IP capture is intentionally retained.';

comment on column public.visitor_analytics_events.ip is
  'Full client IP selected from trusted hosting and proxy request headers.';

alter table public.visitor_analytics_events enable row level security;

revoke all on public.visitor_analytics_events from anon;
revoke all on public.visitor_analytics_events from authenticated;
