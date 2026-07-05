-- RAKURS TRADE — юридичні реквізити для секції контактів
-- Виконати ПІСЛЯ 0001-0004

alter table site_settings
  add column if not exists legal_name text not null default '',
  add column if not exists legal_name_en text not null default '',
  add column if not exists edrpou text not null default '',
  add column if not exists mailing_address text not null default '',
  add column if not exists mailing_address_en text not null default '';

update site_settings set
  legal_name = 'ТОВ «РАКУРС ТРЕЙД»',
  legal_name_en = 'RAKURS TRADE LLC',
  edrpou = '41110462',
  mailing_address = 'м. Одеса, НП №9, ТОВ «РАКУРС ТРЕЙД»',
  mailing_address_en = 'Odesa, Nova Poshta branch №9, RAKURS TRADE LLC'
where id = 1;
