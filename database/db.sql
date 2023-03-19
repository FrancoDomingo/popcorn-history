CREATE DATABASE popcorn

CREATE TABLE history(
    id serial primary key,
    titulo_original varchar(200) not null,
    titulo_secundario varchar(200) null,
    history_type numeric,
    img varchar(200) null,
    fecha date null
);