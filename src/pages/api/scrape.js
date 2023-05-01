const debug = false;
const dotenv = require("dotenv");
dotenv.config();

const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = "https://lredifgqyhmohiblchrt.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxyZWRpZmdxeWhtb2hpYmxjaHJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODI5NDEwMzgsImV4cCI6MTk5ODUxNzAzOH0.HxoX7Ohrk61zFGYs_ATW7JrpuES3sF8Biu3ICixM5TM";
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkDb() {
  var data = await supabase.from("players").select("*");

  if (data.error !== null) {
    console.log(data.error);
    throw new Error(`Error. \nCode: ${data.error.code} \nMessage: ${data.error.message}`);
  } else console.log("Database running and reachable.");
}

async function getPlayers() {
  var data = await supabase.from("players").select("*");

  if (data.error !== null) {
    console.log(data.error);
    throw new Error(`Error. \nCode: ${data.error.code} \nMessage: ${data.error.message}`);
  } else return await data.data;
}

async function getMatchHistory(id) {
  var data = await supabase.from("players").select("*").eq("id", id);

  if (data.error !== null) {
    console.log(data.error);
    throw new Error(`Error. \nCode: ${data.error.code} \nMessage: ${data.error.message}`);
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
      var itemArray = [player.item_0, player.item_1, player.item_2, player.item_3, player.item_4, player.item_5];
      allMatches[index].items = itemArray;
      allMatches[index].player = id;
    });
  }

  return allMatches;
}

async function pushMatch(match) {
  var insertMatch = await supabase
    .from("matches")
    .insert({ id: match.match_id, rank: match.average_rank, start_time: match.start_time, duration: match.duration });

  if (debug) {
    if (insertMatch.error !== null) {
      console.log(`\x1b[31mInsert failed into matches. \x1b[0m\nCode: ${insertMatch.error.code} Message: ${insertMatch.error.message}`);
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

  var inDb = await supabase.from("players").select("*").match({ id: 294548916, username: "Colfox" });
  if (inDb.data.length == 0) {
    console.log("\x1b[31mMatch data already in DB: \x1b[0m");
    console.log(`\x1b[36mMatch: \x1b[0m${match.match_id}`);
    console.log(`\x1b[36mPlayer: \x1b[0m${match.player}`);

    return -1;
  } else {
    var insertMatchData = await supabase.from("match_data").insert({
      player_id: match.player,
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
      assists: match.assists,
      party_size: match.party_size,
    });
    if (debug) {
      if (insertMatchData == !null) {
        console.log("\x1b[31mInsert failed into match_data: \x1b[0m" + insertMatchData.error);
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
          party_size: match.party_size,
        });
      }
    }
  }
}

async function pushAll() {
  var allPlayers = await getPlayers();

  var totalMatches = 0;
  for (let index = 0; index < allPlayers.length; index++) {
    await getMatchHistory(allPlayers[index].id).then((matches) => {
      if (matches.length > 0) {
        for (let index2 = 0; index2 < matches.length; index2++) {
          pushMatch(matches[index2]);
        }
        totalMatches += matches.length;
      }

      if (index > 0 && !debug) {
        process.stdout.moveCursor(0, -1);
        process.stdout.clearLine(1);
      }
      console.log(`\x1b[34m${allPlayers[index].username} pushed. ${allPlayers.length - (index - 1)} players remaining.\x1b[0m`);
    });
  }
  console.log(`\x1b[32mData scrape complete. \x1b[0m\x1b[34m${totalMatches} matches pushed.\x1b[0m`);
}

async function main() {
  var start = new Date();
  await pushAll().then(() => {
    var finish = new Date();
    console.log(
      `\x1b[33mTime taken: \x1b[0m${Math.floor((finish - start) / 1000 / 60)} minutes ${Math.round((finish - start) / 1000) % 60} seconds.`
    );
  });
}

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
    const result = await fetch(process.env.OPENDOTAURL + "players/" + id + "/matches?date=4", {
      method: "GET",
    });

    return await result.json();
  } catch (err) {
    console.log(err);
    return null;
  }
}

export default async function handler({ query: { id } }, res) {
    let time = new Date();
    console.log(`\x1b[34m   time - \x1b[0m ${time.toLocaleString()}`);
    console.log(`\x1b[32m   endpoint - \x1b[0m /api/scrape`);

    main()

    console.log("\x1b[31m   status - \x1b[0m 200");
    res.status(200).send({ message: `Scraping Player Data.`, status: 200 })
}