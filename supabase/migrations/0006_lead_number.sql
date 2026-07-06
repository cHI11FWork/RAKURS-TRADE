-- RAKURS TRADE — наскрізна нумерація заявок
-- Виконати один раз у Supabase Dashboard -> SQL Editor -> New query -> Run

-- Послідовний номер заявки (1, 2, 3...), автоматично заповнюється для нових рядків
-- і бекфілиться для вже існуючих.
alter table leads add column if not exists lead_number bigint generated always as identity;

create unique index if not exists leads_lead_number_idx on leads (lead_number);

-- RPC-функція для публічної (анонімної) вставки ліда, яка повертає lead_number.
-- SECURITY DEFINER потрібен, бо у анонімного користувача немає прав на SELECT/RETURNING
-- з таблиці leads (тільки на INSERT) — функція виконується від імені власника,
-- але повертає лише сам номер, без жодних інших даних.
create or replace function public.submit_lead(
  p_name text,
  p_phone text,
  p_company text,
  p_email text,
  p_message text
) returns bigint
language plpgsql
security definer
set search_path = public
as $$
declare
  v_lead_number bigint;
begin
  insert into leads (name, phone, company, email, message)
  values (p_name, p_phone, p_company, p_email, p_message)
  returning lead_number into v_lead_number;

  return v_lead_number;
end;
$$;

revoke all on function public.submit_lead(text, text, text, text, text) from public;
grant execute on function public.submit_lead(text, text, text, text, text) to anon, authenticated;
