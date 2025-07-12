create table public.documentos (
  id uuid not null default gen_random_uuid (),
  nombre character varying(255) not null,
  url text not null,
  categoria_id bigint not null,
  created_at timestamp with time zone null default now(),
  updated_at timestamp with time zone null default now(),
  constraint documentos_pkey primary key (id),
  constraint fk_documentos_categoria foreign KEY (categoria_id) references categorias (id) on delete CASCADE
) TABLESPACE pg_default;