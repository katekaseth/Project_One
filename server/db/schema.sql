create table if not exists users (
    id int not null auto_increment primary key,
	pass_hash varchar(128) not null,
	username varchar(255) not null,
	CONSTRAINT UC_user UNIQUE (username)
);