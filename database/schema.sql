-- TravelKulture production database
-- Run in Supabase SQL Editor after creating the project.

create extension if not exists "pgcrypto";

create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  role text not null default 'customer' check (role in ('customer','admin')),
  created_at timestamptz not null default now()
);

create table if not exists tours (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  summary text,
  description text,
  start_date date not null,
  end_date date not null,
  price numeric(12,2) not null,
  currency text not null default 'NGN',
  seats_total integer not null default 0,
  seats_available integer not null default 0,
  cover_image text,
  status text not null default 'draft' check (status in ('draft','published','archived')),
  created_at timestamptz not null default now()
);

create table if not exists tour_days (
  id uuid primary key default gen_random_uuid(),
  tour_id uuid not null references tours(id) on delete cascade,
  day_number integer not null,
  title text,
  description text,
  created_at timestamptz not null default now()
);

create table if not exists bookings (
  id uuid primary key default gen_random_uuid(),
  reference text unique not null,
  tour_id uuid not null references tours(id),
  customer_id uuid references auth.users(id),
  customer_name text not null,
  customer_email text not null,
  customer_phone text,
  travelers integer not null default 1,
  total_amount numeric(12,2) not null default 0,
  currency text not null default 'NGN',
  status text not null default 'pending' check (status in ('pending','confirmed','cancelled','completed')),
  payment_reference text,
  created_at timestamptz not null default now()
);

create table if not exists itineraries (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null references bookings(id) on delete cascade,
  day_number integer not null,
  title text not null,
  details text,
  status text default 'scheduled',
  created_at timestamptz not null default now()
);

create table if not exists reviews (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid references bookings(id),
  customer_id uuid references auth.users(id),
  tour_id uuid references tours(id),
  rating integer not null check (rating between 1 and 5),
  body text not null,
  approved boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  price numeric(12,2) not null,
  currency text not null default 'NGN',
  stock integer not null default 0,
  image_url text,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid references auth.users(id),
  status text not null default 'pending',
  total_amount numeric(12,2) not null default 0,
  currency text not null default 'NGN',
  payment_reference text,
  created_at timestamptz not null default now()
);

create table if not exists order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references orders(id) on delete cascade,
  product_id uuid not null references products(id),
  quantity integer not null default 1,
  unit_price numeric(12,2) not null
);

create table if not exists radio_episodes (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  episode_date date,
  youtube_url text,
  audio_url text,
  published boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists trip_updates (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null references bookings(id) on delete cascade,
  title text not null,
  message text not null,
  created_at timestamptz not null default now()
);

create table if not exists notifications (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid references auth.users(id),
  booking_id uuid references bookings(id),
  title text not null,
  message text not null,
  read_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists bookings_reference_idx on bookings(reference);
create index if not exists tours_status_idx on tours(status);
create index if not exists reviews_tour_idx on reviews(tour_id);

-- IMPORTANT:
-- Enable Row Level Security and add policies appropriate to your auth/admin model
-- before using this database in production. Do not expose the service role key
-- in the browser.
