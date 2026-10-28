create table public.uporabnik (
    id_uporabnika uuid not null,
    ime character varying not null,
    priimek character varying null,
    constraint uporabnik_pkey primary key (id_uporabnika),
    constraint uporabnik_id_uporabnika_fkey foreign KEY (id_uporabnika) references auth.users (id) on update CASCADE on delete CASCADE
) TABLESPACE pg_default;

create table public.vpis (
    id_vpisa uuid not null default gen_random_uuid (),
    id_uporabnika uuid not null,
    kategorija character varying null,
    pocutje character varying null,
    opombe character varying null,
    cas_vpisa time without time zone null,
    datum_vpisa date null,
    constraint vpis_pkey primary key (id_vpisa),
    constraint vpis_id_uporabnika_fkey foreign KEY (id_uporabnika) references uporabnik (id_uporabnika) on update CASCADE on delete CASCADE
) TABLESPACE pg_default;

create table public.kategorija (
  id_kategorije uuid not null default gen_random_uuid (),
  id_uporabnika uuid null,
  naziv character varying null,
  constraint kategorija_pkey primary key (id_kategorije),
  constraint kategorija_id_uporabnika_fkey foreign KEY (id_uporabnika) references uporabnik (id_uporabnika) on update CASCADE on delete CASCADE
) TABLESPACE pg_default;