CREATE TABLE public.users (
  id bigserial NOT NULL,
  "name" varchar(200) NOT NULL,
  email varchar(200) NOT NULL,
  phone varchar(50) NULL DEFAULT NULL::character varying,
  latitude varchar(50) NULL DEFAULT NULL::character varying,
  longitude varchar(50) NULL DEFAULT NULL::character varying
);