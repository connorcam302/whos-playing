const dotenv = require("dotenv");
dotenv.config();

const { createClient } = require("@supabase/supabase-js") 

const supabaseUrl = "https://lredifgqyhmohiblchrt.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxyZWRpZmdxeWhtb2hpYmxjaHJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODI5NDEwMzgsImV4cCI6MTk5ODUxNzAzOH0.HxoX7Ohrk61zFGYs_ATW7JrpuES3sF8Biu3ICixM5TM"
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler({ query: { id } }, res) {
  let time = new Date();
  console.log(`\x1b[34m   time - \x1b[0m ${time.toLocaleString()}`);
  console.log(`\x1b[32m   endpoint - \x1b[0m /api/player/${id}`);

  var player = await supabase.from("players").select("*").match({"id": id})

  if(player.error !== null){
    console.log("\x1b[31m   status - \x1b[0m 400");
    res.status(400).send(player.error);
  } else if(player.data.length == 0){
    console.log("\x1b[31m   status - \x1b[0m 404");
    res.status(404).json({
      message: `Player with id ${id} not found.`,
      status: 404 
    });
  }
  else {
    console.log("\x1b[31m   status - \x1b[0m 200");
    res.status(200).send(player.data)
  }
}
