CREATE TABLE matches (
	id bigint NOT NULL,
	rank bigint NOT NULL,
	start_time bigint NOT NULL,
	duration bigint NOT NULL,
	CONSTRAINT matches_pk PRIMARY KEY (id)
);


CREATE TABLE players (
	id bigint NOT NULL,
	username text NOT NULL,
	CONSTRAINT players_pk PRIMARY KEY (id)
);

CREATE TABLE match_data (
	id serial NOT NULL,
	player_id bigint NOT NULL,
	match_id bigint NOT NULL,
	hero_id bigint NOT NULL,
	winner BOOLEAN NOT NULL,
	kills bigint NOT NULL,
	deaths bigint NOT NULL,
	assists bigint NOT NULL,
	item_0 bigint NOT NULL,
	item_1 bigint NOT NULL,
	item_2 bigint NOT NULL,
	item_3 bigint NOT NULL,
	item_4 bigint NOT NULL,
	item_5 bigint NOT NULL,
	CONSTRAINT match_data_pk PRIMARY KEY (id),
	UNIQUE(player_id, match_id)
);

ALTER TABLE match_data ADD CONSTRAINT match_data_fk0 FOREIGN KEY (player_id) REFERENCES players(id);
ALTER TABLE match_data ADD CONSTRAINT match_data_fk1 FOREIGN KEY (match_id) REFERENCES matches(id);

INSERT INTO players (username, id) VALUES ('Colfox', 294548916);
INSERT INTO players (username, id) VALUES ('Callum', 229886086);
INSERT INTO players (username, id) VALUES ('Shane', 328412884);
INSERT INTO players (username, id) VALUES ('Matthew', 231268625);
INSERT INTO players (username, id) VALUES ('Tom', 106505218);
INSERT INTO players (username, id) VALUES ('Bingham', 80370391);
INSERT INTO players (username, id) VALUES ('Joe', 80321157);
INSERT INTO players (username, id) VALUES ('Frenchy', 258517108);
INSERT INTO players (username, id) VALUES ('Phil', 132939229);
INSERT INTO players (username, id) VALUES ('Steve', 132022693);
INSERT INTO players (username, id) VALUES ('Dom', 110099229);
INSERT INTO players (username, id) VALUES ('Sighboys', 312271581);