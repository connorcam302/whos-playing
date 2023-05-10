const { createClient } = require("@supabase/supabase-js");
const itemImport = require("@/data/itemMap.js");
const itemMap = itemImport.itemMap
const heroImport = require("@/data/heroMap.js");
const heroMap = heroImport.heroMap
const dotenv = require("dotenv");
dotenv.config();

const supabase = createClient(process.env.SUPABASEURL, process.env.SUPABASEKEY);

export default async function handler({ query: { page } }, res) {
  let time = new Date();

  var matchData = await getMatchData();

  if (matchData !== -1) {
    for (let index = 0; index < matchData.length; index++) {
      matchData[index].hero = heroMap.get(matchData[index].hero_id);
      
      var itemArray = [
        {
          id: matchData[index].item_0,
          img: itemMap.get(matchData[index].item_0).img,
          name: itemMap.get(matchData[index].item_0).name,
        },
        {
          id: matchData[index].item_1,
          img: itemMap.get(matchData[index].item_1).img,
          name: itemMap.get(matchData[index].item_1).name,
        },
        {
          id: matchData[index].item_2,
          img: itemMap.get(matchData[index].item_2).img,
          name: itemMap.get(matchData[index].item_2).name,
        },
        {
          id: matchData[index].item_3,
          img: itemMap.get(matchData[index].item_3).img,
          name: itemMap.get(matchData[index].item_3).name,
        },
        {
          id: matchData[index].item_4,
          img: itemMap.get(matchData[index].item_4).img,
          name: itemMap.get(matchData[index].item_4).name,
        },
        {
          id: matchData[index].item_5,
          img: itemMap.get(matchData[index].item_5).img,
          name: itemMap.get(matchData[index].item_5).name,
        },
        {
          id: matchData[index].item_neutral,
          img: itemMap.get(matchData[index].item_neutral).img,
          name: itemMap.get(matchData[index].item_neutral).name,
        },
      ];

      delete matchData[index].item_0
      delete matchData[index].item_1
      delete matchData[index].item_2
      delete matchData[index].item_3
      delete matchData[index].item_4
      delete matchData[index].item_5
      delete matchData[index].item_neutral

      matchData[index].items = itemArray;
    }
  }

  if (matchData.length > 0) {
    var sortedMatches = matchData.sort(
      (a, b) => b.start_time + b.duration - (a.start_time + a.duration)
    );

    if(page !== undefined) {
      sortedMatches = sortedMatches.slice(page*20,((page*20)+20))
    }

    res.status(200).send(sortedMatches);
  } else {
    res.status(404).json({
      message: `No Matches Found.`,
    });
  }
}

async function getMatchData() {
  var data = await supabase.from("match_data").select("*, matches(*), players(*)").order("match_id", { ascending: false });
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