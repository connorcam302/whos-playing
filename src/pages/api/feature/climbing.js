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
