import playerArray from "../../data/players";

const OPENDOTA_URL = "https://api.opendota.com/api/"

export default async function handler(req, res) {
  let time = new Date();
  console.log(`\x1b[34m   time - \x1b[0m ${time.toLocaleString()}`);
  console.log("\x1b[32m   endpoint - \x1b[0m /api/gamedata/heroes");
  console.log("\x1b[31m   status - \x1b[0m 200");

  await fetchHeroData().then(heroesJSON => {
    var heroes = []
    for(var i in heroesJSON){
      heroes.push(heroesJSON[i]);
    }
    heroes.map((hero) => {
      let heroTag = hero.name.slice(14,hero.name.length)
      hero.img = `http://cdn.dota2.com/apps/dota2/images/heroes/${heroTag}_full.png`
      hero.icon = `https://api.opendota.com${hero.icon}`
    })

    if (heroes.length > 0) {
      console.log("\x1b[31m   status - \x1b[0m 200");
      res.status(200).json(heroes);
    } else {
      console.log("\x1b[31m   status - \x1b[0m 404");
      res
        .status(404)
        .json({ message: `Heroes not returned from OpenDota API` });
    }
  })
}

async function fetchHeroData() {
  try {
    const result = await fetch(
      `https://raw.githubusercontent.com/odota/dotaconstants/master/build/heroes.json`
    );
    return await result.json();
  } catch (err) {
    console.log(err);
    return null;
  }
}
