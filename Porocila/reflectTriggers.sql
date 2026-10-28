-- Ustvari uporabnika iz novega vnosa v auth.users
create or replace function public.ustvari_uporabnika()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.uporabnik (id_uporabnika, ime, priimek)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'ime', ''),
    new.raw_user_meta_data ->> 'priimek'
  );
  return new;
end;
$$;

-- Odobri admin pravico uporabniku za brisanje svojega računa
create trigger ob_registraciji
after insert on auth.users
for each row execute function public.ustvari_uporabnika();

create or replace function public.izbrisi_racun()
returns void
language plpgsql
security definer set search_path = ''
as $$
begin
  if auth.uid() is null then
    raise exception 'Niste prijavljeni.';
  end if;

  delete from auth.users where id = auth.uid();
end;
$$;

revoke execute on function public.izbrisi_racun() from public, anon;
grant execute on function public.izbrisi_racun() to authenticated;