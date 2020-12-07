create database if not exists starcraft;

use starcraft;

create table razas(
    id_raza int not null auto_increment,
    name varchar(50) not null,
    power int not null,
    primary key (id_raza)
);

describe razas;

insert into razas
(id_raza, name, power)
values
(1, 'protoss',50);

select * from razas;