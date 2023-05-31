const { createClient } = require("@supabase/supabase-js") 
const supabase = createClient(process.env.SUPABASEURL, process.env.SUPABASEKEY);

const itemImport = require("@/data/itemMap.js");
const itemMap = itemImport.itemMap;
const heroImport = require("@/data/heroMap.js");
const heroMap = heroImport.heroMap;

const dotenv = require("dotenv");
dotenv.config();

export default async function handler({ query: { id } }, res) {
  const players = await supabase.from("players").select("*")

  let matchData = await fetchMatchData(id);
  matchData = matchData.result;
  console.log(matchData)
  
  matchData.players.map((player) => {
    let playerInfo = players.data.find((element) => element.id == player.account_id);
    if(playerInfo !== undefined){
        player.name = playerInfo.username;
    } else {
        player.name = "Anonymous";
    }

    player.items = [{id: player.item_0, img: itemMap.get(player.item_0).img, name: itemMap.get(player.item_0).name},
                    {id: player.item_1, img: itemMap.get(player.item_1).img, name: itemMap.get(player.item_1).name},
                    {id: player.item_2, img: itemMap.get(player.item_2).img, name: itemMap.get(player.item_2).name},
                    {id: player.item_3, img: itemMap.get(player.item_3).img, name: itemMap.get(player.item_3).name},
                    {id: player.item_4, img: itemMap.get(player.item_4).img, name: itemMap.get(player.item_4).name},
                    {id: player.item_5, img: itemMap.get(player.item_5).img, name: itemMap.get(player.item_5).name},
                    {id: player.item_neutral, img: itemMap.get(player.item_neutral).img, name: itemMap.get(player.item_neutral).name}];

    player.hero_img = heroMap.get(player.hero_id).img;
    player.hero_name = heroMap.get(player.hero_id).name;
    
    delete player.item_0;
    delete player.item_1;
    delete player.item_2;
    delete player.item_3;
    delete player.item_4;
    delete player.item_5;
    delete player.item_neutral;
  })
  matchData.picks_bans.map((pick_ban) => {
    pick_ban.img = heroMap.get(pick_ban.hero_id).img;
  })
  res.status(200).send(matchData);
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