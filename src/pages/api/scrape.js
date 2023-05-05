const debug = false;
const dotenv = require("dotenv");
dotenv.config();

const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(process.env.SUPABASEURL, process.env.SUPABASEKEY);

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

  var openDotaData = await fetchOpenDotaData(id)
  var allMatches = [];
  var allMatchId = [];
  var userData = await fetchUserData(id);
  var data = userData.result.matches;
  for (let index = 0; index < data.length; index++) {
    allMatchId.push(data[index].match_id);
  }

  for (let index = 0; index < allMatchId.length; index++) {
    
    await fetchMatchData(allMatchId[index]).then((match) => {

      match = match.result;
      allMatches[index] = match;
      if(openDotaData.length > 0) {
        var openDotaMatch = openDotaData.find((e) => e.match_id == match.match_id);
        if(openDotaMatch == undefined) {
          allMatches[index].average_rank = 99;
        } else {
          allMatches[index].party_size = openDotaMatch.party_size
          allMatches[index].average_rank = openDotaMatch.average_rank
        }
      }

      let players = match.players;
      var player = players.find((x) => x.account_id == id);
      if (
        // Radiant slots are 0-127, Dire is 128-255
        (player.player_slot <= 127 && match.radiant_win === true) ||
        (player.player_slot >= 128 && match.radiant_win === false)
      ) {
        allMatches[index].winner = true;
      } else {
        allMatches[index].winner = false;
      }

      var itemArray = [player.item_0, player.item_1, player.item_2, player.item_3, player.item_4, player.item_5, player.item_neutral];

      allMatches[index].items = itemArray;
      allMatches[index].last_hits = player.last_hits;
      allMatches[index].gold_per_min = player.gold_per_min;
      allMatches[index].xp_per_min = player.xp_per_min;
      allMatches[index].aghanims_scepter = player.aghanims_scepter;
      allMatches[index].aghanims_shard = player.aghanims_shard;
      allMatches[index].player = player.account_id;
      allMatches[index].kills = player.kills;
      allMatches[index].deaths = player.deaths;
      allMatches[index].assists = player.assists;
      allMatches[index].hero_id = player.hero_id;
      // allMatches[index].

      delete allMatches[index].players;
      delete allMatches[index].picks_bans;
    });
  }
  return allMatches;
}

async function pushMatch(match) {
  var insertMatch = await supabase.from("matches").insert({ id: match.match_id, rank: match.average_rank, start_time: match.start_time, duration: match.duration });

  if (debug) {
    if (insertMatch.error !== null) {
      console.log(`\x1b[31mInsert failed into matches. \x1b[0m\nCode: ${insertMatch.error.code} Message: ${insertMatch.error.message}`);
      console.log(`\x1b[36mMatch: \x1b[0m${match.match_id}`);
    } else {
      console.log("\x1b[32mInserted into matches: \x1b[0m");
      console.table({
        match_id: match.match_id,
        start_time: match.start_time,
        duration: match.duration,
      });
    }
  }

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
    item_neutral: match.items[6],
    party_size: match.party_size,
    kills: match.kills,
    deaths: match.deaths,
    assists: match.assists,
    last_hits: match.last_hits,
    gold_per_min: match.gold_per_min,
    xp_per_min: match.xp_per_min,
    aghanims_scepter: match.aghanims_scepter,
    aghanims_shard: match.aghanims_shard,
  });

  if (debug) {
    if (insertMatchData == !null) {
      console.log("\x1b[31mInsert failed into match_data: \x1b[0m" + insertMatchData.error);
      console.log(`\x1b[36mMatch: \x1b[0m${match.match_id}`);
      console.log(`\x1b[36mPlayer: \x1b[0m${match.player}`);
    } else {
      console.log("\x1b[32mInserted into match_data: \x1b[0m");
      console.table({
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
        item_neutral: match.items[6],
        party_size: match.party_size,
        kills: match.kills,
        deaths: match.deaths,
        assists: match.assists,
        last_hits: match.last_hits,
        gold_per_min: match.gold_per_min,
        xp_per_min: match.xp_per_min,
        aghanims_scepter: match.aghanims_scepter,
        aghanims_shard: match.aghanims_shard,
      });
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
        // process.stdout.moveCursor(0, -1);
        // process.stdout.clearLine(1);
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
    const result = await fetch(`${process.env.STEAMURL}/IDOTA2Match_570/getMatchHistory/v1?key=${process.env.STEAMKEY}&account_id=${id}&matches_requested=10`, {
      method: "GET",
    });
    return await result.json();
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function fetchOpenDotaData(id) {
  try {
    const result = await fetch(`${process.env.OPENDOTAURL}/players/${id}/matches?date=1`, {
      method: "GET",
    });
    return result.json();
  } catch (err) {
    console.log(err);
    return null;
  }
}

export default async function handler({ query: { id } }, res) {
  main();
  res.status(200).send({ message: `Scraping Player Data.`, status: 200 });
}
