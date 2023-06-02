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
    let lowest = findLowest(data);
    lowest.username = players.filter(
      (player) => player.id == lowest.id
    )[0].username;
    res.status(200).json(lowest);
  });
}

async function getWinLoss(id) {
  try {
    const result = await fetch(
      `${process.env.BASEURL}api/stats/player/${id}?days=7`,
      {
        method: "GET",
      }
    );
    return await result.json();
  } catch (err) {
    console.log(err);
    return null;
  }
}

function findLowest(array) {
  let minCombination = Infinity;
  let minObject = null;

  for (let i = 0; i < array.length; i++) {
    const object = array[i];
    const combination = object.wins - object.losses;

    if (combination < minCombination) {
      minCombination = combination;
      minObject = object;
    }
  }

  return minObject;
}
