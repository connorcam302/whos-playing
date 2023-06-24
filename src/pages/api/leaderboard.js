const { createClient } = require("@supabase/supabase-js");
const dotenv = require("dotenv");
dotenv.config();

const supabase = createClient(process.env.SUPABASEURL, process.env.SUPABASEKEY);

export default async function handler({ query: {} }, res) {
  var players = await supabase.from("players").select("*");
  players = players.data;
  let data = await players.map((player) => getPlayerData(player.id));
  Promise.allSettled(data).then((newData) => {
    console.log(newData);
    let trimmedData = newData.map((obj) => ({
      id: obj.value.steamAccount.id,
      name: players.filter(
        (player) => player.id === obj.value.steamAccount.id
      )[0].username,
      rank:
        obj.value.steamAccount.seasonRank == undefined
          ? -1
          : obj.value.steamAccount.seasonRank,
      leaderboard:
        obj.value.steamAccount.seasonLeaderboardRank == undefined
          ? undefined
          : obj.value.steamAccount.seasonLeaderboardRank,
    }));
    trimmedData
      .sort(function (a, b) {
        if (
          a.rank === b.rank &&
          (a.leaderboard !== undefined || b.leaderboard !== undefined)
        ) {
          return b.leaderboard - a.leaderboard;
        }
        return a.rank > b.rank ? 1 : -1;
      })
      .reverse();
    if (trimmedData.length > 0) {
      res.status(200).json(trimmedData);
    } else {
      res.status(404).json({
        message: `No players found.`,
        status: 404,
      });
    }
  });
}

async function getPlayerData(id) {
  const headers = { Authorization: `Bearer ${process.env.STRATZKEY}` };
  var response = await fetch(`https://api.stratz.com/api/v1/Player/${id}`, {
    headers,
  });
  const data = await response.json();
  return await data;
}
