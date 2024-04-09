CREATE TABLE IF NOT EXISTS public.users
(
    id bigint NOT NULL DEFAULT nextval('users_id_seq'::regclass),
    email character varying COLLATE pg_catalog."default" NOT NULL,
    password character varying COLLATE pg_catalog."default",
    username character varying COLLATE pg_catalog."default" DEFAULT ''::character varying,
    CONSTRAINT users_pkey PRIMARY KEY (email)
);

CREATE TABLE IF NOT EXISTS public.products
(
    product_name character varying COLLATE pg_catalog."default" NOT NULL,
    userid character varying COLLATE pg_catalog."default" NOT NULL,
    price numeric DEFAULT 0.0,
    sku character varying COLLATE pg_catalog."default" DEFAULT ''::character varying,
    description character varying COLLATE pg_catalog."default" DEFAULT ''::character varying,
    created_at timestamp with time zone,
    CONSTRAINT products_pkey PRIMARY KEY (product_name, userid)
);