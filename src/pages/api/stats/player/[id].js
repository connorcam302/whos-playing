const { createClient } = require("@supabase/supabase-js");
const supabase = createClient(process.env.SUPABASEURL, process.env.SUPABASEKEY);

const dotenv = require("dotenv");
dotenv.config();

export default async function handler({ query: { id, days } }, res) {
  if (!days > 0) days = 9999;
  var d = new Date();
  d.setDate(d.getDate() - days);

  var matches = await supabase
    .from("matches")
    .select("start_time, match_data(match_id, player_id, winner)")
    .eq("match_data.player_id", id)
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

  var player = {id: id, wins:0 , losses:0};

  player.wins = allMatches.filter((match) => match.winner).length;
  player.losses = allMatches.filter((match) => !match.winner).length;

  res.status(200).send(player);
}
