-- Uporabnik
create policy "Uporabnik lahko bere svoj profil"
on "uporabnik" for select
to authenticated
using ( (select auth.uid()) = id_uporabnika );

create policy "Uporabnik lahko ustvari svoj profil"
on "uporabnik" for insert
to authenticated
with check ( (select auth.uid()) = id_uporabnika );

create policy "Uporabnik lahko ureja svoj profil"
on "uporabnik" for update
to authenticated
using ( (select auth.uid()) = id_uporabnika )
with check ( (select auth.uid()) = id_uporabnika );

-- Vpis
create policy "Uporabnik lahko bere svoje vpise"
on "vpis" for select
to authenticated
using ( (select auth.uid()) = id_uporabnika );

create policy "Uporabnik lahko dodaja svoje vpise"
on "vpis" for insert
to authenticated
with check ( (select auth.uid()) = id_uporabnika );

create policy "Uporabnik lahko ureja svoje vpise"
on "vpis" for update
to authenticated
using ( (select auth.uid()) = id_uporabnika )
with check ( (select auth.uid()) = id_uporabnika );

create policy "Uporabnik lahko briše svoje vpise"
on "vpis" for delete
to authenticated
using ( (select auth.uid()) = id_uporabnika );

-- Kategorija
create policy "Uporabnik lahko bere svoje kategorije"
on public.kategorija for select
to authenticated
using ( (select auth.uid()) = id_uporabnika );

create policy "Uporabnik lahko dodaja svoje kategorije"
on public.kategorija for insert
to authenticated
with check ( (select auth.uid()) = id_uporabnika );

create policy "Uporabnik lahko ureja svoje kategorije"
on public.kategorija for update
to authenticated
using ( (select auth.uid()) = id_uporabnika )
with check ( (select auth.uid()) = id_uporabnika );

create policy "Uporabnik lahko briše svoje kategorije"
on public.kategorija for delete
to authenticated
using ( (select auth.uid()) = id_uporabnika );