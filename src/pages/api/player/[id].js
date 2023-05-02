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
