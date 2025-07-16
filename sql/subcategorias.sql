create table public.subcategorias (
  id uuid not null default gen_random_uuid (),
  nombre character varying(255) not null,
  categoria bigint not null,
  created_at timestamp with time zone null default now(),
  updated_at timestamp with time zone null default now(),
  constraint subcategorias_pkey primary key (id),
  constraint fk_subcategorias_categoria foreign KEY (categoria) references categorias (id) on delete CASCADE
) TABLESPACE pg_default;