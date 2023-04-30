const { Pool } = require("pg");
const dotenv = require("dotenv");
dotenv.config();

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

pool.options.max = 1;

export default async function handler({ query: { id } }, res) {
  let time = new Date();
  console.log(`\x1b[34m   time - \x1b[0m ${time.toLocaleString()}`);
  console.log(`\x1b[32m   endpoint - \x1b[0m /api/matches/player/${id}`);

  var heroData = await fetchHeroData();
  var itemData = await fetchItemData();
  var matchData = await getMatchData(id);

  for (let index = 0; index < matchData.length; index++) {
    matchData[index].hero = heroData.find((hero) => hero.id == matchData[index].hero);

    var itemArray = [
      {
        id: matchData[index].item_0,
        img: itemData.find((item) => item.id == matchData[index].item_0).img,
        name: itemData.find((item) => item.id == matchData[index].item_0).dname,
      },
      {
        id: matchData[index].item_1,
        img: itemData.find((item) => item.id == matchData[index].item_1).img,
        name: itemData.find((item) => item.id == matchData[index].item_1).dname,
      },
      {
        id: matchData[index].item_2,
        img: itemData.find((item) => item.id == matchData[index].item_2).img,
        name: itemData.find((item) => item.id == matchData[index].item_2).dname,
      },
      {
        id: matchData[index].item_3,
        img: itemData.find((item) => item.id == matchData[index].item_3).img,
        name: itemData.find((item) => item.id == matchData[index].item_3).dname,
      },
      {
        id: matchData[index].item_4,
        img: itemData.find((item) => item.id == matchData[index].item_4).img,
        name: itemData.find((item) => item.id == matchData[index].item_4).dname,
      },
      {
        id: matchData[index].item_5,
        img: itemData.find((item) => item.id == matchData[index].item_5).img,
        name: itemData.find((item) => item.id == matchData[index].item_5).dname,
      },
    ];

    matchData[index].items = itemArray;
  }

  // console.log(matchData);

  if (matchData[0] != null) {
    console.log("\x1b[31m   status - \x1b[0m 200");
    res.status(200).json(matchData);
  } else {
    console.log("\x1b[31m   status - \x1b[0m 404");
    res.status(404).json({
      message: `Matches for player with id ${id} not found.`,
      status: 404 
    });
  }
}

async function fetchHeroData() {
  try {
    const result = await fetch(process.env.BASEURL + "gamedata/heroes", {
      method: "GET",
    });

    return await result.json();
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function fetchItemData() {
  try {
    const result = await fetch(process.env.BASEURL + `gamedata/items`);
    return await result.json();
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function getMatchData(id) {
  try {
    const res = await pool.query(`SELECT * FROM match_data JOIN matches ON match_data.match_id = matches.id JOIN players ON match_data.player_id = players.id WHERE player_id=$1`, [id]);
    return res.rows;
  } catch (err) {
    return err.stack;
  }
}
