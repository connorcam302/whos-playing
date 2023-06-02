const { createClient } = require("@supabase/supabase-js");
const supabase = createClient(process.env.SUPABASEURL, process.env.SUPABASEKEY);

const dotenv = require("dotenv");
dotenv.config();

export default async function handler(req, res) {
  var players = await supabase.from("players").select("*");
  players = players.data;
  var playerData = players.map((x) => getWinLoss(x.id));
  Promise.allSettled(playerData).then((newData) => {
    let data = [];
    newData.map((player) => {
      data.push(player.value);
    });
    let largest = findBiggest(data);
    largest.username = players.filter(
      (player) => player.id == largest.id
    )[0].username;
    res.status(200).json(largest);
  });
}

async function getWinLoss(id) {
  var d = new Date();
  d.setDate(d.getDate() - 7);

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

  return player
}

function findBiggest(array) {
  let maxCombination = -Infinity;
  let maxObject = null;

  for (let i = 0; i < array.length; i++) {
    const object = array[i];
    const combination = object.wins - object.losses;

    if (combination > maxCombination) {
      maxCombination = combination;
      maxObject = object;
    }
  }

  return maxObject;
}
