-- RAKURS TRADE — англійська локалізація контенту
-- Виконати ПІСЛЯ 0001_init.sql та 0002_seed.sql
-- Додає _en-колонки до редагованих в адмінці таблиць та заповнює їх
-- англійським перекладом поточного контенту з 0002_seed.sql.

-- ==========================================================
-- 1. SITE SETTINGS
-- ==========================================================
alter table site_settings add column if not exists address_en text not null default '';
alter table site_settings add column if not exists footer_note_1_en text not null default '';
alter table site_settings add column if not exists footer_note_2_en text not null default '';

update site_settings set
  address_en = 'Odesa, Ukraine',
  footer_note_1_en = 'We are updating our corporate website to make it even more informative.',
  footer_note_2_en = 'Our specialists are ready to answer your questions and prepare a tailored solution.'
where id = 1;

-- ==========================================================
-- 2. HERO
-- ==========================================================
alter table hero add column if not exists title_main_en text not null default '';
alter table hero add column if not exists title_highlight_en text not null default '';
alter table hero add column if not exists subtitle_en text not null default '';
alter table hero add column if not exists cta_text_en text not null default '';

update hero set
  title_main_en = 'ENGINEERING SOLUTIONS FOR AUTONOMOUS POWER SUPPLY, LIGHTNING PROTECTION AND ',
  title_highlight_en = 'CRITICAL INFRASTRUCTURE',
  subtitle_en = 'We design, supply and implement comprehensive engineering solutions for industry, telecommunications, the fuel and energy sector, critical infrastructure facilities, and Defense & Security.',
  cta_text_en = 'GET A CONSULTATION'
where id = 1;

alter table hero_features add column if not exists title_en text not null default '';
alter table hero_features add column if not exists subtitle_en text not null default '';

update hero_features set title_en = 'RELIABILITY', subtitle_en = 'Solutions for uninterrupted facility operation' where title = 'НАДІЙНІСТЬ';
update hero_features set title_en = 'ENGINEERING EXPERTISE', subtitle_en = 'A professional approach to every project' where title = 'ІНЖЕНЕРНА ЕКСПЕРТИЗА';
update hero_features set title_en = 'EQUIPMENT QUALITY', subtitle_en = 'We work with leading manufacturers' where title = 'ЯКІСТЬ ОБЛАДНАННЯ';
update hero_features set title_en = 'ACROSS UKRAINE', subtitle_en = 'We deliver projects across the whole territory of Ukraine' where title = 'ПО ВСІЙ УКРАЇНІ';

-- ==========================================================
-- 3. НАПРЯМИ
-- ==========================================================
alter table directions add column if not exists title_en text not null default '';
alter table directions add column if not exists button_text_en text not null default '';

update directions set title_en = 'AUTONOMOUS POWER SUPPLY', button_text_en = 'DISCUSS THE PROJECT' where title = 'АВТОНОМНЕ ЕНЕРГОЗАБЕЗПЕЧЕННЯ';
update directions set title_en = 'LIGHTNING PROTECTION & GROUNDING', button_text_en = 'DISCUSS THE PROJECT' where title = 'БЛИСКАВОЗАХИСТ ТА ЗАЗЕМЛЕННЯ';
update directions set title_en = 'DEFENSE & SECURITY', button_text_en = 'DISCUSS THE PROJECT' where title = 'DEFENSE & SECURITY';

alter table direction_items add column if not exists text_en text not null default '';

update direction_items set text_en = 'Portable generators' where text = 'Портативні генератори';
update direction_items set text_en = 'Industrial generators up to 2500 kW' where text = 'Промислові генератори до 2500 кВт';
update direction_items set text_en = 'Generators on transport platforms' where text = 'Генератори на транспортних платформах';
update direction_items set text_en = 'Hybrid power systems' where text = 'Гібридні системи живлення';
update direction_items set text_en = 'Generator automation and monitoring' where text = 'Автоматизація та моніторинг генераторів';

update direction_items set text_en = 'Design' where text = 'Проєктування';
update direction_items set text_en = 'Supply of materials' where text = 'Постачання матеріалів';
update direction_items set text_en = 'External and internal lightning protection' where text = 'Зовнішній та внутрішній блискавозахист';
update direction_items set text_en = 'Grounding' where text = 'Заземлення';
update direction_items set text_en = 'Protection of gas stations, oil depots, industrial facilities and telecom infrastructure' where text = 'Захист АЗС, нафтобаз, промислових підприємств і телеком-інфраструктури';

update direction_items set text_en = 'Mobile power complexes' where text = 'Мобільні енергетичні комплекси';
update direction_items set text_en = 'Autonomous power systems' where text = 'Автономні системи живлення';
update direction_items set text_en = 'Protected power solutions' where text = 'Захищені енергетичні рішення';
update direction_items set text_en = 'Automation and monitoring' where text = 'Автоматизація та моніторинг';
update direction_items set text_en = 'Special engineering systems' where text = 'Спеціальні інженерні системи';

-- ==========================================================
-- 4. ПРО КОМПАНІЮ
-- ==========================================================
alter table about_content add column if not exists heading_en text not null default '';
alter table about_content add column if not exists paragraph_1_en text not null default '';
alter table about_content add column if not exists paragraph_2_en text not null default '';

update about_content set
  heading_en = 'ABOUT THE COMPANY',
  paragraph_1_en = 'RAKURS TRADE is a Ukrainian engineering company specializing in comprehensive solutions in autonomous power supply, lightning protection and special engineering systems.',
  paragraph_2_en = 'We help businesses ensure the uninterrupted operation of mission-critical facilities by combining modern technology, engineering expertise and an individual approach to every project.'
where id = 1;

alter table about_stats add column if not exists number_text_en text not null default '';
alter table about_stats add column if not exists label_text_en text not null default '';

update about_stats set number_text_en = '10+', label_text_en = 'years of experience in engineering solutions' where label_text = 'років досвіду у сфері інженерних рішень';
update about_stats set number_text_en = '100+', label_text_en = 'completed projects across Ukraine' where label_text = 'реалізованих проєктів по всій Україні';
update about_stats set number_text_en = '200+', label_text_en = 'regular corporate clients' where label_text = 'постійних корпоративних клієнтів';
update about_stats set number_text_en = '24/7', label_text_en = 'support and maintenance service' where label_text = 'підтримка та сервісне обслуговування';
