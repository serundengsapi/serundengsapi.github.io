-- Create news table to store crypto news articles
create table if not exists public.news (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  content text not null,
  image_url text,
  source text not null,
  author text,
  url text not null unique,
  published_at timestamptz not null,
  category text not null,
  sentiment text check (sentiment in ('positive', 'negative', 'neutral')),
  created_at timestamptz default now()
);

-- Create comments table
create table if not exists public.comments (
  id uuid primary key default gen_random_uuid(),
  news_id uuid not null references public.news(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  content text not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Create votes table (thumbs up/down)
create table if not exists public.votes (
  id uuid primary key default gen_random_uuid(),
  news_id uuid not null references public.news(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  vote_type text not null check (vote_type in ('up', 'down')),
  created_at timestamptz default now(),
  unique(news_id, user_id)
);

-- Create profiles table for user information
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  display_name text,
  avatar_url text,
  created_at timestamptz default now()
);

-- Enable Row Level Security
alter table public.news enable row level security;
alter table public.comments enable row level security;
alter table public.votes enable row level security;
alter table public.profiles enable row level security;

-- News policies (public read, no write from users)
create policy "news_select_all"
  on public.news for select
  using (true);

-- Comments policies
create policy "comments_select_all"
  on public.comments for select
  using (true);

create policy "comments_insert_own"
  on public.comments for insert
  with check (auth.uid() = user_id);

create policy "comments_update_own"
  on public.comments for update
  using (auth.uid() = user_id);

create policy "comments_delete_own"
  on public.comments for delete
  using (auth.uid() = user_id);

-- Votes policies
create policy "votes_select_all"
  on public.votes for select
  using (true);

create policy "votes_insert_own"
  on public.votes for insert
  with check (auth.uid() = user_id);

create policy "votes_update_own"
  on public.votes for update
  using (auth.uid() = user_id);

create policy "votes_delete_own"
  on public.votes for delete
  using (auth.uid() = user_id);

-- Profiles policies
create policy "profiles_select_all"
  on public.profiles for select
  using (true);

create policy "profiles_insert_own"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "profiles_update_own"
  on public.profiles for update
  using (auth.uid() = id);

-- Create indexes for better performance
create index if not exists idx_comments_news_id on public.comments(news_id);
create index if not exists idx_comments_user_id on public.comments(user_id);
create index if not exists idx_votes_news_id on public.votes(news_id);
create index if not exists idx_votes_user_id on public.votes(user_id);
create index if not exists idx_news_published_at on public.news(published_at desc);
create index if not exists idx_news_category on public.news(category);
