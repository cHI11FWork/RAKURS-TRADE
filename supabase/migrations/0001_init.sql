-- RAKURS TRADE — початкова схема бази даних
-- Виконати один раз у Supabase Dashboard -> SQL Editor -> New query -> Run

-- ==========================================================
-- 1. SITE SETTINGS (singleton) — контакти, соцмережі, футер
-- ==========================================================
create table if not exists site_settings (
  id smallint primary key default 1 check (id = 1),
  phone text not null default '',
  email text not null default '',
  address text not null default '',
  telegram_url text not null default '',
  whatsapp_url text not null default '',
  linkedin_url text not null default '',
  footer_note_1 text not null default '',
  footer_note_2 text not null default '',
  updated_at timestamptz not null default now()
);

-- ==========================================================
-- 2. HERO (singleton) — головний банер
-- ==========================================================
create table if not exists hero (
  id smallint primary key default 1 check (id = 1),
  title_main text not null default '',
  title_highlight text not null default '',
  subtitle text not null default '',
  cta_text text not null default '',
  cta_link text not null default '#contacts',
  background_image_url text,
  updated_at timestamptz not null default now()
);

-- Переваги під геро-банером (Надійність / Експертиза / Якість / По всій Україні)
create table if not exists hero_features (
  id uuid primary key default gen_random_uuid(),
  icon text not null default 'shield',
  title text not null default '',
  subtitle text not null default '',
  sort_order integer not null default 0,
  is_visible boolean not null default true,
  updated_at timestamptz not null default now()
);

-- ==========================================================
-- 3. НАПРЯМИ (3 картки послуг)
-- ==========================================================
create table if not exists directions (
  id uuid primary key default gen_random_uuid(),
  icon text not null default 'bolt',
  title text not null default '',
  image_url text,
  button_text text not null default 'Обговорити проєкт',
  button_link text not null default '#contacts',
  enable_lightning_effect boolean not null default false,
  sort_order integer not null default 0,
  is_visible boolean not null default true,
  updated_at timestamptz not null default now()
);

create table if not exists direction_items (
  id uuid primary key default gen_random_uuid(),
  direction_id uuid not null references directions(id) on delete cascade,
  text text not null default '',
  sort_order integer not null default 0,
  is_visible boolean not null default true,
  updated_at timestamptz not null default now()
);

-- ==========================================================
-- 4. ПРО КОМПАНІЮ
-- ==========================================================
create table if not exists about_content (
  id smallint primary key default 1 check (id = 1),
  heading text not null default '',
  paragraph_1 text not null default '',
  paragraph_2 text not null default '',
  updated_at timestamptz not null default now()
);

create table if not exists about_stats (
  id uuid primary key default gen_random_uuid(),
  icon text not null default 'calendar',
  number_text text not null default '',
  label_text text not null default '',
  sort_order integer not null default 0,
  is_visible boolean not null default true,
  updated_at timestamptz not null default now()
);

-- ==========================================================
-- 5. ЗАЯВКИ З ФОРМИ КОНТАКТІВ
-- ==========================================================
create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  company text,
  email text,
  message text not null,
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);

-- ==========================================================
-- RLS: публічний перегляд контенту, запис лише для адміна
-- ==========================================================
alter table site_settings enable row level security;
alter table hero enable row level security;
alter table hero_features enable row level security;
alter table directions enable row level security;
alter table direction_items enable row level security;
alter table about_content enable row level security;
alter table about_stats enable row level security;
alter table leads enable row level security;

-- Публічне читання контенту сайту
create policy "public read site_settings" on site_settings for select using (true);
create policy "public read hero" on hero for select using (true);
create policy "public read hero_features" on hero_features for select using (true);
create policy "public read directions" on directions for select using (true);
create policy "public read direction_items" on direction_items for select using (true);
create policy "public read about_content" on about_content for select using (true);
create policy "public read about_stats" on about_stats for select using (true);

-- Редагування контенту — тільки для залогиненого адміна
create policy "admin write site_settings" on site_settings for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin write hero" on hero for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin write hero_features" on hero_features for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin write directions" on directions for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin write direction_items" on direction_items for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin write about_content" on about_content for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin write about_stats" on about_stats for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- Ліди: будь-хто може надіслати заявку, читати/змінювати може лише адмін
create policy "public insert leads" on leads for insert with check (true);
create policy "admin read leads" on leads for select using (auth.role() = 'authenticated');
create policy "admin update leads" on leads for update
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin delete leads" on leads for delete using (auth.role() = 'authenticated');

-- ==========================================================
-- STORAGE: публічний бакет для зображень (герой, картки напрямів)
-- ==========================================================
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

create policy "public read media" on storage.objects for select
  using (bucket_id = 'media');
create policy "admin upload media" on storage.objects for insert
  with check (bucket_id = 'media' and auth.role() = 'authenticated');
create policy "admin update media" on storage.objects for update
  using (bucket_id = 'media' and auth.role() = 'authenticated');
create policy "admin delete media" on storage.objects for delete
  using (bucket_id = 'media' and auth.role() = 'authenticated');
