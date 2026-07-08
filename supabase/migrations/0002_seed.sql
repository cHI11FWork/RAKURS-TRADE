-- RAKURS TRADE — початковий контент (можна одразу редагувати з адмінки)
-- Виконати ПІСЛЯ 0001_init.sql

insert into site_settings (id, phone, email, address, telegram_url, whatsapp_url, linkedin_url, footer_note_1, footer_note_2)
values (
  1,
  '+38 (0XX) XXX-XX-XX',
  'info@rakurstrade.com.ua',
  'Одеса, Україна',
  'https://t.me/',
  'https://wa.me/',
  'https://www.linkedin.com/',
  'Ми оновлюємо корпоративний сайт, щоб зробити його ще більш інформативним.',
  'Наші фахівці вже готові відповісти на ваші запити та підготувати індивідуальне рішення.'
)
on conflict (id) do nothing;

insert into hero (id, title_main, title_highlight, subtitle, cta_text, cta_link)
values (
  1,
  'ІНЖЕНЕРНІ РІШЕННЯ ДЛЯ АВТОНОМНОГО ЕНЕРГОЗАБЕЗПЕЧЕННЯ, БЛИСКАВОЗАХИСТУ ТА ',
  'КРИТИЧНОЇ ІНФРАСТРУКТУРИ',
  E'Проєктуємо, постачаємо та впроваджуємо комплексні інженерні рішення для промисловості, телекомунікаційної галузі, паливно-енергетичного сектору, об''єктів критичної інфраструктури та Defense & Security.',
  'ОТРИМАТИ КОНСУЛЬТАЦІЮ',
  '#contacts'
)
on conflict (id) do nothing;

insert into hero_features (icon, title, subtitle, sort_order) values
  ('shield', 'НАДІЙНІСТЬ', 'Рішення для безперервної роботи об''єктів', 1),
  ('gear', 'ІНЖЕНЕРНА ЕКСПЕРТИЗА', 'Професійний підхід до кожного проєкту', 2),
  ('trophy', 'ЯКІСТЬ ОБЛАДНАННЯ', 'Співпрацюємо з провідними виробниками', 3),
  ('map-pin', 'ПО ВСІЙ УКРАЇНІ', 'Реалізуємо проєкти по всій території України', 4);

with d1 as (
  insert into directions (icon, title, button_text, button_link, enable_lightning_effect, sort_order)
  values ('bolt', 'АВТОНОМНЕ ЕНЕРГОЗАБЕЗПЕЧЕННЯ', 'ОБГОВОРИТИ ПРОЄКТ', '#contacts', false, 1)
  returning id
)
insert into direction_items (direction_id, text, sort_order)
select id, item, ord from d1, (values
  ('Портативні генератори', 1),
  ('Промислові генератори до 2500 кВт', 2),
  ('Генератори на транспортних платформах', 3),
  ('Гібридні системи живлення', 4),
  ('Автоматизація та моніторинг генераторів', 5)
) as items(item, ord);

with d2 as (
  insert into directions (icon, title, button_text, button_link, enable_lightning_effect, sort_order)
  values ('shield-lightning', 'БЛИСКАВОЗАХИСТ ТА ЗАЗЕМЛЕННЯ', 'ОБГОВОРИТИ ПРОЄКТ', '#contacts', true, 2)
  returning id
)
insert into direction_items (direction_id, text, sort_order)
select id, item, ord from d2, (values
  ('Проєктування', 1),
  ('Постачання матеріалів', 2),
  ('Зовнішній та внутрішній блискавозахист', 3),
  ('Заземлення', 4),
  ('Захист АЗС, нафтобаз, промислових підприємств і телеком-інфраструктури', 5)
) as items(item, ord);

with d3 as (
  insert into directions (icon, title, button_text, button_link, enable_lightning_effect, sort_order)
  values ('crosshair', 'DEFENSE & SECURITY', 'ОБГОВОРИТИ ПРОЄКТ', '#contacts', false, 3)
  returning id
)
insert into direction_items (direction_id, text, sort_order)
select id, item, ord from d3, (values
  ('Мобільні енергетичні комплекси', 1),
  ('Автономні системи живлення', 2),
  ('Захищені енергетичні рішення', 3),
  ('Автоматизація та моніторинг', 4),
  ('Спеціальні інженерні системи', 5)
) as items(item, ord);

insert into about_content (id, heading, paragraph_1, paragraph_2)
values (
  1,
  'ПРО КОМПАНІЮ',
  'RAKURS TRADE — українська інженерна компанія, що спеціалізується на комплексних рішеннях у сфері автономного енергозабезпечення, блискавозахисту та спеціальних інженерних систем.',
  'Ми допомагаємо підприємствам забезпечити безперебійну роботу критично важливих об''єктів, поєднуючи сучасні технології, інженерну експертизу та індивідуальний підхід до кожного проєкту.'
)
on conflict (id) do nothing;

insert into about_stats (icon, number_text, label_text, sort_order) values
  ('calendar', '10+', 'років досвіду у сфері інженерних рішень', 1),
  ('building', '100+', 'реалізованих проєктів по всій Україні', 2),
  ('users', '200+', 'постійних корпоративних клієнтів', 3),
  ('shield-check', '24/7', 'підтримка та сервісне обслуговування', 4);
