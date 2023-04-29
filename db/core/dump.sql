CREATE TABLE matches (
	id bigint NOT NULL,
	rank bigint NOT NULL,
	start_time bigint NOT NULL,
	duration bigint NOT NULL,
	CONSTRAINT matches_pk PRIMARY KEY (id)
);


CREATE TABLE players (
	id bigint NOT NULL,
	name text NOT NULL,
	CONSTRAINT players_pk PRIMARY KEY (id)
);

CREATE TABLE match_data (
	id serial NOT NULL,
	player_id bigint NOT NULL,
	match_id bigint NOT NULL,
	hero bigint NOT NULL,
	winner BOOLEAN NOT NULL,
	item_0 bigint NOT NULL,
	item_1 bigint NOT NULL,
	item_2 bigint NOT NULL,
	item_3 bigint NOT NULL,
	item_4 bigint NOT NULL,
	item_5 bigint NOT NULL,
	CONSTRAINT match_data_pk PRIMARY KEY (id)
);

ALTER TABLE match_data ADD CONSTRAINT match_data_fk0 FOREIGN KEY (player_id) REFERENCES players(id);
ALTER TABLE match_data ADD CONSTRAINT match_data_fk1 FOREIGN KEY (match_id) REFERENCES matches(id);

INSERT INTO players (id, name) VALUES (294548916, 'Colfox');
INSERT INTO players (id, name) VALUES (229886086,'Callum');