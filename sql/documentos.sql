create table public.documentos (
  id uuid not null default gen_random_uuid (),
  nombre character varying(255) not null,
  url text not null,
  subcategoria_id uuid not null,
  created_at timestamp with time zone null default now(),
  updated_at timestamp with time zone null default now(),
  constraint documentos_pkey primary key (id),
  constraint fk_documentos_subcategoria foreign KEY (subcategoria_id) references subcategorias (id) on delete CASCADE
) TABLESPACE pg_default;