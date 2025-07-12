create table public.categorias (
  id bigint generated always as identity not null,
  nombre character varying(255) not null,
  descripcion text null,
  created_at timestamp with time zone null default now(),
  updated_at timestamp with time zone null default now(),
  constraint categorias_pkey primary key (id)
) TABLESPACE pg_default;