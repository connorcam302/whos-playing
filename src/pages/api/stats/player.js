const { createClient } = require("@supabase/supabase-js");
const supabase = createClient(process.env.SUPABASEURL, process.env.SUPABASEKEY);
import heroesJson from "../../../data/heroes.json";

const dotenv = require("dotenv");
dotenv.config();

export default async function handler({ query: { limit, days} }, res) {
  if (!days > 0) days = 5;
  var d = new Date();
  d.setDate(d.getDate() - days);

  var matches = await supabase
    .from("matches")
    .select("start_time, match_data(match_id, player_id, winner)")
    .gte("start_time", Math.floor(d.valueOf() / 1000));
  matches = matches.data;

  matches = matches.filter((item) => item.match_data.length > 0);

  let allMatches = [];
  for (let index = 0; index < matches.length; index++) {
    let matchData = matches[index].match_data;
    for (let index2 = 0; index2 < matchData.length; index2++) {
      allMatches.push({
        match_id: matchData[index2].match_id,
        player_id: matchData[index2].player_id,
        winner: matchData[index2].winner,
        start_time: matches[index].start_time,
      });
    }
  }

  var players = await supabase.from("players").select("username, id");
  players = players.data;

  for (let index = 0; index < players.length; index++) {
    players[index].wins = allMatches.filter((match) => match.player_id === players[index].id && match.winner).length;
    players[index].losses = allMatches.filter((match) => match.player_id === players[index].id && !match.winner).length;
  }

  players = players.sort((a, b) => b.wins + b.losses - (a.wins + a.losses));

  if(limit > 0) {
    players = players.slice(0, limit)
  } 

  res.status(200).send(players);
}

1682681994734;
1682884764;
