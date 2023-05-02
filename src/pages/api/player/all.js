const { createClient } = require("@supabase/supabase-js") 
const supabaseUrl = "https://lredifgqyhmohiblchrt.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxyZWRpZmdxeWhtb2hpYmxjaHJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODI5NDEwMzgsImV4cCI6MTk5ODUxNzAzOH0.HxoX7Ohrk61zFGYs_ATW7JrpuES3sF8Biu3ICixM5TM"
const supabase = createClient(supabaseUrl, supabaseKey);

const dotenv = require("dotenv");
dotenv.config();

export default async function handler({ query: { id } }, res) {
  var player = await supabase.from("players").select("*")

  if(player.error !== null){
    res.status(404).send({ message: `Player with id ${id} not found.`, status: 404 });
  } else {
    res.status(200).send(player.data)
  }
}