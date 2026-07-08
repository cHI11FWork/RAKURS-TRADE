-- RAKURS TRADE — другий телефон та Instagram
-- Виконати ПІСЛЯ 0001-0003

alter table site_settings
  add column if not exists phone_2 text not null default '',
  add column if not exists instagram_url text not null default '';

update site_settings set
  phone = '0 800 319 080',
  phone_2 = '+38 093 587 0 785',
  email = 'as@rakurstrade.com',
  instagram_url = 'https://instagram.com/rakurs_trade'
where id = 1;
