const { createClient } = require("@supabase/supabase-js");
const supabase = createClient(process.env.SUPABASEURL, process.env.SUPABASEKEY);

const dotenv = require("dotenv");
dotenv.config();

export default async function handler(req, res) {
  let data = await getMatchData();
  res.status(200).json(data[0]);
}

async function getMatchData() {
  var d = new Date();
  d.setDate(d.getDate() - 7);

  var data = await supabase
    .from("match_data")
    .select("*, matches!inner(*), players(*)")
    .gte("matches.start_time", Math.floor(d.valueOf() / 1000))
    .order("deaths", { ascending: false })
    .limit(1);
  if (data.error == null && data.data.length > 0) {
    for (let index = 0; index < data.data.length; index++) {
      data.data[index].start_time = data.data[index].matches.start_time;
      data.data[index].rank = data.data[index].matches.rank;
      data.data[index].duration = data.data[index].matches.duration;
      delete data.data[index].matches;

      data.data[index].username = data.data[index].players.username;
      delete data.data[index].players;
    }
    return await data.data;
  } else return -1;
}
