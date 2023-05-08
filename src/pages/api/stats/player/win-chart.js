const { createClient } = require("@supabase/supabase-js");
const itemImport = require("@/data/itemMap.js");
const itemMap = itemImport.itemMap;
const heroImport = require("@/data/heroMap.js");
const heroMap = heroImport.heroMap;
const dotenv = require("dotenv");
dotenv.config();

const supabase = createClient(process.env.SUPABASEURL, process.env.SUPABASEKEY);

export default async function handler({ query: { id, days } }, res) {
  if (!days > 0) days = 50;
  var date = new Date();
  date.setDate(date.getDate() - days);

  var matchData = await getMatchData(id, date);

  var sortedMatches = matchData.sort((a, b) => b.start_time - a.start_time);
  matchData = sortedMatches.reverse();

  var winChart = [0];
  for (let index = 0; index < matchData.length; index++) {
    if (matchData[index].winner == true) {
      winChart.push(winChart[index] + 1);
    } else if (matchData[index].winner == false) {
      winChart.push(winChart[index] - 1);
    }
  }
  res.status(200).send(winChart);
}

async function getMatchData(id, date) {
  console.log(Math.floor(date.valueOf()));
  var data = await supabase
    .from("match_data")
    .select("winner, player_id, match_id, matches(start_time)")
    .eq("player_id", id)
  if (data.error == null && data.data.length > 0) {
    data = data.data
    data = data.filter((item) => item.matches.start_time > Math.floor(date.valueOf()/1000))
    for (let index = 0; index < data.length; index++) {
      data[index].start_time = data[index].matches.start_time;
      delete data[index].matches;
    }
    return await data;
  } else {
    console.log(data);
    return -1;
  }
}
