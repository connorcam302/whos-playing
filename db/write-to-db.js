const { Pool } = require("pg");
const log = require("log-with-statusbar")();
const dotenv = require("dotenv");

const debug = false;
dotenv.config();

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

pool.options.max = 1;

const checkDb = () => {
  pool.query("SELECT * FROM players", (err, res) => {
    if (err) throw err;

    // Process the rows returned from the query
    if (res.rows[0] != null) console.log("Database running and reachable.");
  });
};

async function getPlayers() {
  try {
    const res = await pool.query("SELECT * FROM players");
    return res.rows;
  } catch (err) {
    return err.stack;
  }
}

async function getMatchHistory(id) {
  try {
    const res = await pool.query(`SELECT * FROM players WHERE id=$1`, [id]);
  } catch (err) {
    console.log(err.stack);
  }

  var allMatches = [];
  await fetchUserData(id).then((matches) => (allMatches = matches));

  for (let index = 0; index < allMatches.length; index++) {
    if (allMatches[index].average_rank === null) {
      allMatches[index].average_rank = 99;
    }
    allMatches[index].player = id;
    // Radiant slots are 0-127, Dire is 128-255
    if (
      (allMatches[index].player_slot <= 127 && allMatches[index].radiant_win === true) ||
      (allMatches[index].player_slot >= 128 && allMatches[index].radiant_win === false)
    ) {
      allMatches[index].winner = true;
    } else {
      allMatches[index].winner = false;
    }
  }

  for (let index = 0; index < allMatches.length; index++) {
    await fetchMatchData(allMatches[index].match_id).then((match) => {
      let players = match.result.players;
      var player = players.find((x) => x.account_id == id);
      itemArray = [player.item_0, player.item_1, player.item_2, player.item_3, player.item_4, player.item_5];
      allMatches[index].items = itemArray;
      allMatches[index].player = id;
    });
  }

  return allMatches;
}

async function pushMatch(match) {
  const insertMatches = await pool.query(
    `INSERT INTO matches (id, rank, start_time, duration) VALUES ($1, $2, $3, $4)`,
    [match.match_id, match.average_rank, match.start_time, match.duration],
    (err, res) => {
      if (debug) {
        if (err) {
          console.log("\x1b[31mInsert failed into matches: \x1b[0m" + err);
          console.log(`\x1b[36mMatch: \x1b[0m${match.match_id}`);
        } else {
          console.log("\x1b[32mInserted into matches: \x1b[0m");
          console.table({
            match_id: match.match_id,
            rank: match.average_rank,
            start_time: match.start_time,
            duration: match.duration,
          });
        }
      }
    }
  );

  const inDb = await pool.query(`SELECT * FROM match_data WHERE player_id=$1 AND match_id=$2`, [match.player, match.match_id]);
  if (inDb.rows.size == 0) {
    console.log("\x1b[31mMatch data already in DB: \x1b[0m");
    console.log(`\x1b[36mMatch: \x1b[0m${match.match_id}`);
    console.log(`\x1b[36mPlayer: \x1b[0m${match.player}`);

    return -1;
  } else {
    const insertMatchData = await pool.query(
      `INSERT INTO match_data (player_id, match_id, hero_id, winner, item_0, item_1, item_2, item_3, item_4, item_5, kills, deaths, assists, party_size) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)`,
      [
        match.player,
        match.match_id,
        match.hero_id,
        match.winner,
        match.items[0],
        match.items[1],
        match.items[2],
        match.items[3],
        match.items[4],
        match.items[5],
        match.kills,
        match.deaths,
        match.assists,
        match.party_size
      ],
      (err, res) => {
        if (debug) {
          if (err) {
            console.log("\x1b[31mInsert failed into match_data: \x1b[0m" + err);
            console.log(`\x1b[36mMatch: \x1b[0m${match.match_id}`);
            console.log(`\x1b[36mPlayer: \x1b[0m${match.player}`);
          } else {
            console.log("\x1b[32mInserted into match_data: \x1b[0m");
            console.table({
              player: match.player,
              match_id: match.match_id,
              hero_id: match.hero_id,
              winner: match.winner,
              item_0: match.items[0],
              item_1: match.items[1],
              item_2: match.items[2],
              item_3: match.items[3],
              item_4: match.items[4],
              item_5: match.items[5],
              kills: match.kills,
              deaths: match.deaths,
              assits: match.assists,
              party_size: match.party_size
            });
          }
        }
      }
    );
  }
}


async function pushAll() {
  var allPlayers = await getPlayers();

  var totalMatches = 0;
  for (let index = 0; index < allPlayers.length; index++) {
    await getMatchHistory(allPlayers[index].id).then((matches) => {
      if(matches.length > 0){
        for (let index2 = 0; index2 < matches.length; index2++) {
          pushMatch(matches[index2]);
        }
        totalMatches += matches.length
      }

      if(index > 0){
        process.stdout.moveCursor(0, -1)
        process.stdout.clearLine(1)
      }
      console.log(`\x1b[34m${allPlayers[index].username} pushed. ${allPlayers.length-(index-1)} players remaining.\x1b[0m`);
    });
  }
  console.log(`\x1b[32mData scrape complete. \x1b[0m\x1b[34m${totalMatches} matches pushed.\x1b[0m`);
}

async function main() {
  var start = new Date();
  await pushAll().then(() => {
    var finish = new Date();
    console.log(
      `\x1b[33mTime taken: \x1b[0m${Math.floor(((finish - start) / 1000) / 60)} minutes ${Math.round((finish - start) / 1000) % 60} seconds.`
    );
  });
}

main();

async function fetchMatchData(id) {
  try {
    const result = await fetch(`${process.env.STEAMURL}/IDOTA2Match_570/GetMatchDetails/v1?key=${process.env.STEAMKEY}&match_id=${id}`, {
      method: "GET",
    });

    return await result.json();
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function fetchUserData(id) {
  try {
    const result = await fetch(process.env.OPENDOTAURL + "players/" + id + "/matches?date=7", {
      method: "GET",
    });

    return await result.json();
  } catch (err) {
    console.log(err);
    return null;
  }
}
