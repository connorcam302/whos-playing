const dotenv = require("dotenv");
dotenv.config();

const { createClient } = require("@supabase/supabase-js") 
const supabase = createClient(process.env.SUPABASEURL, process.env.SUPABASEKEY);

export default async function handler({ query: { id } }, res) {
  var player = await supabase.from("players").select("*").match({"id": id})

  if(player.error !== null){
    res.status(400).send(player.error);
  } else if(player.data.length == 0){
    res.status(404).json({
      message: `Player with id ${id} not found.`,
      status: 404 
    });
  }
  else {
    res.status(200).send(player.data)
  }
}

async function getPlayerData() {
  if(typeof page == 'undefined') var page = -1
  var data = await supabase.from("match_data").select("*, matches(*), players(*)").order("match_id", { ascending: false }).limit((page === -1 ? 500 : page+1*20));
  if (data.error == null && data.data.length > 0) {
    for (let index = 0; index < data.data.length; index++) {
      data.data[index].start_time = data.data[index].matches.start_time;
      data.data[index].rank = data.data[index].matches.rank;
      data.data[index].duration = data.data[index].matches.duration;
      delete data.data[index].matches;

      data.data[index].username = data.data[index].players.username
      delete data.data[index].players
    }
    return await data.data;
  } else return -1;
}